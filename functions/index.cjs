'use strict';
const {initializeApp}=require('firebase-admin/app');
const {getFirestore}=require('firebase-admin/firestore');
const {onSchedule}=require('firebase-functions/v2/scheduler');
const {onDocumentWritten}=require('firebase-functions/v2/firestore');
const {reconcileTeam}=require('./scheduler.cjs');
initializeApp();const options={region:'australia-southeast1',memory:'256MiB',timeoutSeconds:540,maxInstances:1,concurrency:1};
exports.associateDailySchedule=onSchedule({...options,schedule:'every 30 minutes',timeZone:'Australia/Sydney',retryCount:2},async()=>{
 const db=getFirestore();let last=null;
 do{let q=db.collection('teams').orderBy('__name__').limit(50);if(last)q=q.startAfter(last);const page=await q.get();for(const t of page.docs)await reconcileTeam(db,t.id);last=page.size===50?page.docs.at(-1):null}while(last);
});
exports.associateScheduleChanged=onDocumentWritten({...options,document:'teams/{teamId}/taskSchedules/{scheduleId}'},e=>reconcileTeam(getFirestore(),e.params.teamId));
exports.associateRosterChanged=onDocumentWritten({...options,document:'teams/{teamId}/opsProfiles/{memberId}'},e=>reconcileTeam(getFirestore(),e.params.teamId));
exports.associateSettingsChanged=onDocumentWritten({...options,document:'teams/{teamId}/settings/operations'},e=>reconcileTeam(getFirestore(),e.params.teamId));
