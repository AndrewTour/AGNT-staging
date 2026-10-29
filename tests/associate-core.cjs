const assert=require('node:assert/strict'),A=require('../associate-core.js');let checks=0;const ok=(v)=>{assert(v);checks++};
const lead={uid:'lead',opsRole:'agent',active:true,associateUid:'associate',workingDays:[1,2,3,4,5,6]},associate={uid:'associate',opsRole:'associate',active:true,workingDays:[1,3,4,5,6],schedule:{start:'08:30',end:'18:00',absences:[],exceptions:[]}},other={uid:'other',active:true,workingDays:[1,2,3,4,5,6]};const people=[lead,associate,other],members=people.map(p=>p.uid),t={title:'Vendor report',note:'Review and issue Tuesday',leadUid:'lead',assignmentMode:'auto',assignedToUid:'',backupUid:'',frequency:'weekly',repeatDays:[2],status:'active',startDate:'2026-10-26',endDate:'',dueTime:'16:00',absencePolicy:'reassign',timeSensitive:true,priority:'high'};
ok(A.resolve(t,'2026-10-27',people,members).assignedToUid==='lead');
ok(A.resolve({...t,backupUid:'other'},'2026-10-27',people,members).assignedToUid==='other');
ok(A.resolve({...t,backupUid:'outsider'},'2026-10-27',people,members).assignedToUid==='lead');
ok(A.resolve(t,'2026-10-27',[{...lead,associateUid:''},associate],members).assignedToUid==='lead');
const wedOff={...associate,workingDays:[1,2,4,5,6]};
ok(A.resolve({...t,timeSensitive:false,absencePolicy:'move'},'2026-10-28',[lead,wedOff],members).date==='2026-10-29');
ok(A.resolve({...t,timeSensitive:false,absencePolicy:'skip'},'2026-10-27',people,members).skipped);
ok(!A.roster(associate,'2026-11-01').working);ok(!A.roster(associate,'2026-10-31').kpiApplicable);ok(!A.roster(associate,'2026-10-27').kpiApplicable);
ok(A.roster({...associate,schedule:{...associate.schedule,exceptions:[{date:'2026-11-01',working:true,start:'10:00',end:'12:00'}]}},'2026-11-01').working);
ok(!A.roster({...associate,schedule:{...associate.schedule,exceptions:[{date:'2026-10-28',working:true}],absences:[{from:'2026-10-28',to:'2026-10-30',label:'Leave'}]}},'2026-10-28').working);
ok(A.resolve(t,'2026-10-27',[{...lead,workingDays:[]},associate],members).blocked);
for(const off of [2,3])for(let i=0;i<35;i++){const d=A.plus('2026-10-26',i),p={...associate,workingDays:[1,2,3,4,5,6].filter(n=>n!==off)};ok(A.roster(p,d).working===![0,off].includes(A.weekday(d)))}
for(const frequency of ['once','daily','weekly']){const x={...t,frequency,repeatDays:[1,2,3,4,5]};ok(A.dueOn(x,'2026-10-26'));ok(!A.dueOn({...x,status:'paused'},'2026-10-26'));ok(!A.dueOn({...x,status:'ended'},'2026-10-26'));ok(!A.dueOn({...x,endDate:'2026-10-27'},'2026-10-28'));}
ok(A.occurrenceId('template','2026-10-27')===A.occurrenceId('template','2026-10-27'));ok(A.plus('2028-02-28',1)==='2028-02-29');ok(A.today(Date.parse('2026-10-28T13:01:00Z'))==='2026-10-29');
ok(A.standardPack('lead','2026-10-26').find(x=>x.key==='tuesday_reports').absencePolicy==='reassign');ok(A.standardPack('lead','2026-10-26').find(x=>x.key==='second_callbacks').repeatDays[0]===3);
for(const x of A.standardPack('lead','2026-10-26'))ok(A.validate(x));
assert.throws(()=>A.validate({...t,timeSensitive:true,absencePolicy:'move'}));checks++;assert.throws(()=>A.validate({...t,repeatDays:[]}));checks++;
console.log('PASS',checks,'roster, date, allocation, recurrence and standard operating schedule checks');
