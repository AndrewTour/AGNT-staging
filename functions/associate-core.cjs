/* AGNT associate scheduling policy. Shared unchanged by browser and Firebase. */
(function(root,factory){if(typeof module==='object'&&module.exports)module.exports=factory();else root.AGNTAssociate=factory()})(typeof globalThis==='object'?globalThis:this,function(){
 'use strict';
 const DAYS=[1,2,3,4,5,6,0];
 function validDate(d){return typeof d==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(d)&&new Date(d+'T12:00:00Z').toISOString().slice(0,10)===d}
 function plus(d,n){if(!validDate(d))throw Error('Invalid date');return new Date(Date.parse(d+'T12:00:00Z')+n*86400000).toISOString().slice(0,10)}
 function weekday(d){return new Date(d+'T12:00:00Z').getUTCDay()}
 function today(ms=Date.now()){return new Intl.DateTimeFormat('en-CA',{timeZone:'Australia/Sydney',year:'numeric',month:'2-digit',day:'2-digit'}).format(ms)}
 function roster(p,d){
  if(!p||p.active===false)return{working:false,reason:'Inactive profile'};
  const s=p.schedule||{},exception=(s.exceptions||[]).find(x=>x.date===d),absence=(s.absences||[]).find(x=>x.from<=d&&x.to>=d);
  if(absence||(p.leaveDates||[]).includes(d))return{working:false,reason:absence?.label||'Approved absence'};
  const working=exception?exception.working:(p.workingDays||[1,2,4,5,6]).includes(weekday(d));
  return{working,reason:working?(weekday(d)===6?'Inspection day':'Working day'):'Rostered Day Off',start:exception?.start||s.start||'08:30',end:exception?.end||s.end||'18:00',kpiApplicable:working&&![0,6].includes(weekday(d))};
 }
 function nextWorking(p,d,weekdayOnly=false){for(let i=1;i<=370;i++){const x=plus(d,i);if(roster(p,x).working&&(!weekdayOnly||![0,6].includes(weekday(x))))return x}return null}
 function dueOn(t,d){if(t.status!=='active'||d<t.startDate||(t.endDate&&d>t.endDate))return false;return t.frequency==='once'?d===t.startDate:(t.repeatDays||[]).includes(weekday(d))}
 function occurrenceId(id,d){if(!/^[\w.-]{1,220}$/.test(id)||!validDate(d))throw Error('Invalid occurrence identity');return 'routine_'+id+'_'+d}
 function resolve(t,d,profiles,members){
  const people=new Map(profiles.map(p=>[p.uid,p])),ids=new Set(members.map(m=>typeof m==='string'?m:m.uid)),lead=people.get(t.leadUid);
  if(!ids.has(t.leadUid)||!lead||lead.active===false)return{blocked:true,reason:'Lead unavailable or no longer a member'};
  const linked=people.get(lead.associateUid),preferred=t.assignmentMode==='lead'?t.leadUid:t.assignmentMode==='auto'?(linked?.opsRole==='associate'&&linked.active!==false?lead.associateUid:t.leadUid):t.assignedToUid;
  const person=people.get(preferred),available=id=>ids.has(id)&&roster(people.get(id),d).working;
  if(available(preferred))return{assignedToUid:preferred,date:d,source:preferred===t.leadUid?'lead_fallback':'routine'};
  if(!t.timeSensitive&&t.absencePolicy==='skip')return{skipped:true,reason:'Off roster'};
  if(!t.timeSensitive&&t.absencePolicy==='move'&&ids.has(preferred)&&person?.active!==false){const date=nextWorking(person,d,t.frequency==='daily'&&!t.repeatDays.some(n=>[0,6].includes(n)));if(date)return{assignedToUid:preferred,date,source:'roster_move'}}
  const backup=t.backupUid||person?.schedule?.backupUid||'';
  if(backup&&available(backup))return{assignedToUid:backup,date:d,source:'authorised_backup'};
  if(available(t.leadUid))return{assignedToUid:t.leadUid,date:d,source:'lead_fallback'};
  // Deadline remains visible on its due date, with an explicit coverage blocker.
  return{assignedToUid:t.leadUid,date:d,source:'coverage_required',blocked:true,reason:'No available cover. Lead must arrange coverage.'};
 }
 function validate(t){
  if(!t.title?.trim()||t.title.length>160||typeof t.note!=='string'||t.note.length>4000)throw Error('Add a task title and description within the limits.');
  if(!['once','daily','weekly'].includes(t.frequency)||!['active','paused','ended'].includes(t.status)||!['auto','manual','lead'].includes(t.assignmentMode))throw Error('Choose task frequency, status and assignment.');
  if(!validDate(t.startDate)||(t.endDate&&(!validDate(t.endDate)||t.endDate<t.startDate)))throw Error('Check the start and end dates.');
  if(t.frequency!=='once'&&(!t.repeatDays?.length||t.repeatDays.some(d=>!DAYS.includes(d))))throw Error('Choose repeat days.');
  if(!['move','reassign','skip'].includes(t.absencePolicy)||t.timeSensitive&&t.absencePolicy!=='reassign')throw Error('Fixed deadlines must use cover, rather than moving or skipping.');
  if(!['normal','high','urgent'].includes(t.priority)||!/^([01]\d|2[0-3]):[0-5]\d$/.test(t.dueTime))throw Error('Choose a priority and due time.');
  return t;
 }
 const STANDARD=[
  ['day_start','Review today and prioritise',[1,2,3,4,5],'Review appointments, meetings, inspections, due tasks, overdue buyer/seller follow-ups, lead campaigns and MarketPulse. Check assigned Campaign email enquiries. Identify urgent issues for the lead and prioritise prospecting and campaign work.'],
  ['pipeline','Progress buyers, appraisals and pipeline',[1,2,3,4,5],'Record conversations in AGNT. Complete allocated buyer callbacks; update feedback, Hot/Warm/Cold, origin, budget, perceived value, contract position and next action. Follow up appraisal prospects, book LAP/MAP through existing appointments and flag motivated sellers.'],
  ['campaign_ops','Progress allocated campaigns and leverage',[1,2,3,4,5],'Work through relevant property preparation and optional leverage tasks. Coordinate approved suppliers, photography, floor plans, signage and marketing; chase documents and requirements. Record completion on the existing property checklist, not this reminder.'],
  ['close_day','Close the day and prepare next priorities',[1,2,3,4,5],'Ensure calls, door attempts, connections, data and appointments are recorded. Confirm completed/outstanding work, update follow-ups, escalate hot buyers/offers/urgent campaign issues and prepare the next working day.'],
  ['monday_meeting','Monday team meeting',[1],'Attend the 9:30 am meeting with concise campaign summaries.'],
  ['weekend_callbacks','Weekend buyer callbacks and campaign review',[1],'Review Saturday attendance and inspection results for every active campaign. Prioritise contracts, hot buyers, possible offers and second inspections. Finish outstanding callbacks, arrange second inspections, update categories, budgets and perceived value, follow up contracts and set next actions. Escalate serious opportunities.'],
  ['campaign_summary','Prepare concise campaign summaries',[1],'For each property: groups through; phone/email enquiries; contracts requested; number/names of hot buyers; their budgets and perceived values where known; offer/second-inspection intentions; overall feedback/common objections; campaign performance; next action. Do not list every cold buyer; highlight warm buyers only where commercially significant.'],
  ['collect_signs','Collect weekend pointer signs',[1],'Collect weekend pointer signs and record any missing or damaged material.'],
  ['tuesday_reports','Prepare Tuesday vendor reports',[2],'Confirm attendance, enquiries, contracts, offers, hot buyers/budgets, feedback, objections and perceived values. Assess campaign strategy and recommended next actions. Obtain lead review and issue through the approved process on Tuesday. A day off must not postpone this deadline.'],
  ['tuesday_pipeline','Vendor-report follow-through and listing preparation',[2],'Follow up progressing warm buyers and contracts; progress appraisal contacts. Check photography, floor plans, agreements and marketing requirements. Carry routine work to the next working day if unavailable; urgent issues go to lead or cover.'],
  ['second_callbacks','Second-round Saturday buyer callbacks',[3],'Recontact missed/unavailable buyers and those considering the property. Follow up contract reviews and building/pest reports, secure second inspections and update hot buyers/budgets. If Wednesday is off, move to Thursday; urgent buyers need earlier lead/cover action.'],
  ['wednesday_pipeline','Review 3, 6 and 12-month opportunities',[3],'Progress outstanding Tuesday actions, appraisal follow-ups and future pipeline opportunities. Review Thursday/Friday priorities and brief the lead on serious opportunities.'],
  ['thursday_progress','Progress serious buyers and prepare Saturday',[4],'Review every active campaign. Complete moved second callbacks, hot/progressing-warm buyer follow-ups, second inspections, contract requests/questions and offer indications. Update budgets/value and escalate negotiations. Confirm Saturday opens, missing documents/approvals, photography and floor plans. Complete allocated Just Listed/Just Sold activity and prepare Friday requirements.'],
  ['friday_updates','Prepare Friday vendor WhatsApp updates',[5],'For each active campaign review enquiries, callbacks and contracts. Include phone/email enquiries, contracts requested, expected groups, open times, significant buyer developments and next actions. Obtain required review and send through the approved process.'],
  ['open_packs','Prepare Saturday A4 open-home packs',[5],'Check inspection times/allocations, brochures, marketing, two bound contracts where required, laminated privacy notice, QR registration materials, property documents, pointers/signage and access. Confirm each pack is complete.'],
  ['pointer_signs','Install Friday pointer signs',[5],'Install the profile-configured pointer-sign target across appropriate permitted locations. Confirm property coverage and access.'],
  ['auction_packs','Prepare relevant auction packs',[5],'Where an auction is scheduled: check registration forms, bidder cards, pens, supporting documents and auctioneer requirements. Escalate missing documents or unresolved arrangements to the responsible agent.'],
  ['friday_wrap','Friday team wrap-up',[5],'Review prospecting, MarketPulse and leverage work; attend team wrap-up and confirm Saturday inspection responsibilities.'],
  ['saturday_before','Prepare allocated inspections',[6],'Review open times and property allocations. Collect the correct A4 pack, contracts, brochures and privacy materials. Check signage, presentation and access. Arrive early and coordinate with the lead.'],
  ['saturday_during','Capture inspection attendance and serious interest',[6],'Welcome and register buyers in the approved system; confirm details, assist appropriate questions, record useful comments/objections and alert the lead immediately to serious interest/offers. Pricing and negotiations stay with the lead.'],
  ['saturday_after','Record inspection outcomes and Monday callbacks',[6],'Complete attendance records, begin callbacks where practical, record feedback/categories/budgets/value, identify second inspections/contracts and escalate hot buyers. Set remaining callback tasks for Monday. Normal weekday prospecting KPIs do not apply.']
 ];
 function standardPack(leadUid,startDate){return STANDARD.map(([key,title,repeatDays,note])=>({key,title,note,leadUid,assignedToUid:'',assignmentMode:'auto',campaignId:'',priority:key==='tuesday_reports'?'high':'normal',startDate,endDate:'',frequency:repeatDays.length===5?'daily':'weekly',repeatDays,status:'active',dueTime:key==='monday_meeting'?'09:30':key==='tuesday_reports'?'16:00':'17:00',absencePolicy:['tuesday_reports','friday_updates','open_packs','auction_packs','saturday_before','saturday_during','saturday_after'].includes(key)?'reassign':'move',timeSensitive:['tuesday_reports','friday_updates','open_packs','auction_packs','saturday_before','saturday_during','saturday_after'].includes(key),backupUid:'',mandatory:true,reminder:true,condition:key==='campaign_ops'||key==='auction_packs'?'active_campaign':'always'}))}
 return{DAYS,validDate,plus,weekday,today,roster,nextWorking,dueOn,occurrenceId,resolve,validate,standardPack};
});
