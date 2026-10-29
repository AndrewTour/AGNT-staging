'use strict';
const A=require('./associate-core.cjs');
const {createHash}=require('node:crypto');
const {FieldValue}=require('firebase-admin/firestore');
function same(a,b){return JSON.stringify(a)===JSON.stringify(b)}
async function reconcileTeam(db,teamId,now=Date.now()){
 const team=db.doc('teams/'+teamId),settings=await team.collection('settings').doc('operations').get();
 if(!settings.exists||!settings.data().teamOpsV1||!settings.data().associateSchedulerV1)return{disabled:true};
 const [ps,ms,cs,defs]=await Promise.all(['opsProfiles','members','campaigns','taskSchedules'].map(p=>team.collection(p).get()));
 if(defs.size>200)throw Error('More than 200 schedules: split scheduling workload before enabling.');
 const profiles=ps.docs.map(d=>({...d.data(),uid:d.id})),members=ms.docs.map(d=>d.id),campaigns=cs.docs.map(d=>({...d.data(),id:d.id})),today=A.today(now),from=A.plus(today,-14),to=A.plus(today,7);let changed=0;
 const [existing,future]=await Promise.all([team.collection('tasks').where('schedule.version','==',1).where('schedule.originDate','>=',from).where('schedule.originDate','<=',to).get(),team.collection('tasks').where('schedule.version','==',1).where('date','>=',today).get()]),known=new Map([...existing.docs,...future.docs].map(d=>[d.id,d.data()]));
 for(const snap of defs.docs){
  const initial=snap.data();A.validate(initial);const accessUids=[...new Set([initial.leadUid,initial.assignedToUid,initial.backupUid,profiles.find(p=>p.uid===initial.leadUid)?.associateUid].filter(Boolean))];if(!same(initial.accessUids,accessUids)){await snap.ref.update({accessUids});initial.accessUids=accessUids}const policyKey=createHash('sha256').update(JSON.stringify([initial,profiles,members,campaigns.map(c=>[c.id,c.status,c.archived,c.leadUid])])).digest('hex');
  const origins=new Set();for(let day=from;day<=to;day=A.plus(day,1))origins.add(day);for(const task of known.values())if(task.schedule?.templateId===snap.id&&task.date>=today)origins.add(task.schedule.originDate);
  for(const origin of [...origins].sort()){ 
   // Every identity is template + original date, independent of template revisions or assignee.
   const id=A.occurrenceId(snap.id,origin),ref=team.collection('tasks').doc(id),cached=known.get(id);if(cached&&(cached.completedAt||cached.startedAt||cached.schedule?.manual||cached.schedule?.policyKey===policyKey))continue;if(!cached&&!A.dueOn(initial,origin))continue;
   await db.runTransaction(async tx=>{
    const [ds,os,flag]=await Promise.all([tx.get(snap.ref),tx.get(ref),tx.get(team.collection('settings').doc('operations'))]);if(!ds.exists||!flag.data()?.associateSchedulerV1||!flag.data()?.teamOpsV1)return;const d=ds.data(),old=os.exists?os.data():null;
    if(old&&(old.completedAt||old.startedAt||old.schedule?.manual))return;
    const due=A.dueOn({...d,status:'active'},origin),live=d.status==='active'&&due;
    if(!live&&!old)return;
    // Re-read roster and membership in the transaction to reject stale allocation decisions.
    const allUids=[...new Set([d.leadUid,d.assignedToUid,d.backupUid,...profiles.map(p=>p.uid)].filter(Boolean))];
    const reads=await Promise.all(allUids.map(async uid=>{const [p,m]=await Promise.all([tx.get(team.collection('opsProfiles').doc(uid)),tx.get(team.collection('members').doc(uid))]);return{uid,p:p.exists?{...p.data(),uid}:null,m:m.exists}}));
    const people=reads.filter(x=>x.p).map(x=>x.p),memberIds=reads.filter(x=>x.m).map(x=>x.uid),lead=people.find(p=>p.uid===d.leadUid);
    if(!lead||!memberIds.includes(d.leadUid))return;
    let campaign=null;if(d.campaignId){const c=await tx.get(team.collection('campaigns').doc(d.campaignId));campaign=c.exists?c.data():null;if(!campaign||campaign.leadUid!==d.leadUid)return}
    const applicable=(!campaign||!campaign.archived&&!['Sold','Settled','Archived'].includes(campaign.status))&&(d.condition!=='active_campaign'||campaigns.some(c=>c.leadUid===d.leadUid&&!c.archived&&!['Pending','Sold','Settled','Archived'].includes(c.status)));
    const plan=A.resolve(d,origin,people,memberIds);
    if(old&&!d.timeSensitive&&old.date>=today&&plan.date<today&&plan.assignedToUid){const person=people.find(p=>p.uid===plan.assignedToUid),weekdayOnly=d.frequency==='daily'&&!d.repeatDays.some(n=>[0,6].includes(n));plan.date= A.roster(person,today).working&&(!weekdayOnly||![0,6].includes(A.weekday(today)))?today:A.nextWorking(person,today,weekdayOnly)||old.date;plan.source='roster_move'}
    const rolled=plan.date>origin&&A.dueOn({...d,status:'active'},plan.date),inactive=!live||!applicable||plan.skipped||rolled;
    if(!old&&inactive)return;
    const assignedToUid=plan.assignedToUid||d.leadUid,date=plan.date||origin;
    const schedule={version:1,policyKey,templateId:snap.id,templateRevision:d.revision,originDate:origin,manual:false,priority:d.priority,mandatory:d.mandatory,reminder:d.reminder,state:inactive?'inactive':'active',blocked:!!plan.blocked,reason:inactive?(rolled?'Moved into the next regular occurrence':d.status!=='active'?'Schedule '+d.status:'Not applicable'):plan.reason||'',allocationSource:plan.source||'routine'};
    const fields={title:d.title,note:d.note,date,scheduledDate:date,time:d.dueTime,assignedToUid,assignedToName:assignedToUid,accessUids:[...new Set([d.leadUid,assignedToUid])],archived:inactive,schedule,ops:{version:1,campaignId:d.campaignId||'',itemKey:snap.id,category:'collective',leadUid:d.leadUid,assignmentClass:'collective',stage:'',trigger:'',allocationSource:'routine',workDateAt:0}};
    if(old&&Object.entries(fields).every(([k,v])=>same(old[k],v)))return;
    const revision=(old?.revision||0)+1,eventId='schedule_'+id+'_'+revision;
    tx.set(ref,{...old,...fields,id,taskId:id,teamId,createdDate:old?.createdDate||today,at:old?.at||now,setterUid:old?.setterUid||d.createdByUid,setterName:old?.setterName||'AGNT scheduler',completedAt:0,startedAt:0,revision,eventId,updatedByUid:'system',updatedAt:FieldValue.serverTimestamp(),noticeReadAt:old?.assignedToUid===assignedToUid?old.noticeReadAt||0:0});
    tx.create(team.collection('activity').doc(eventId),{kind:'task',recordId:id,revision,label:d.title,verb:old?'Updated':'Created',actorUid:'system',actorName:'AGNT scheduler',at:FieldValue.serverTimestamp(),audienceUids:fields.accessUids,details:{taskLabel:d.title,propertyId:d.campaignId||'',propertyAddress:campaign?.address||'',beforeOwnerUid:old?.assignedToUid||'',afterOwnerUid:assignedToUid,beforeDueDate:old?.date||'',afterDueDate:date,reason:schedule.reason}});changed++;
   });
  }
 }
 await team.collection('settings').doc('schedulerStatus').set({lastRunAt:FieldValue.serverTimestamp(),through:to,changed});return{changed};
}
module.exports={reconcileTeam};
