(function(){
"use strict";
function finite(value, name, min=0, max=Number.MAX_SAFE_INTEGER) {
  if(typeof value!=="number" || !Number.isFinite(value) || value<min || value>max) throw new Error(`${name} must be a finite number from ${min} to ${max}`);
  return value;
}
function clone(value){return JSON.parse(JSON.stringify(value));}
function unique(rows,key){if(new Set(rows.map(r=>r[key])).size!==rows.length)throw new Error(`Duplicate ${key}`);}
function ratio(a,b){return b ? a/b : null;}

const DAY=86400000;
function time(s){const n=Date.parse(s);if(!Number.isFinite(n))throw new Error("Invalid timestamp");return n;}
function validateEvents(events,asOf){
 const now=time(asOf),seen=new Map(),byAccount=new Map(),invalid=new Set(),warnings=[];
 for(const e of events){
  if(!e||!e.account_id||!e.event_id||!["signup","connected","workflow_created","run_success"].includes(e.event))throw new Error("Invalid event record");
  time(e.timestamp);
  if(seen.has(e.event_id)){if(JSON.stringify(seen.get(e.event_id))!==JSON.stringify(e)){invalid.add(e.account_id);invalid.add(seen.get(e.event_id).account_id);warnings.push("Conflicting event ID "+e.event_id);}else warnings.push("Duplicate ignored: "+e.event_id);continue;}
  seen.set(e.event_id,e);if(!byAccount.has(e.account_id))byAccount.set(e.account_id,[]);byAccount.get(e.account_id).push(e);
 }
 const rows=[],excluded=[];
 for(const [id,all] of byAccount){
  const sorted=all.slice().sort((a,b)=>time(a.timestamp)-time(b.timestamp));if(sorted.some((e,i)=>e!==all[i]))warnings.push("Sorted out-of-order events: "+id);
  const signups=sorted.filter(e=>e.event==="signup");
  let reason=invalid.has(id)?"Conflicting event IDs":signups.length!==1?"Requires one signup":null;
  const start=signups.length===1?time(signups[0].timestamp):null;
  const segment=signups[0]?.segment;
  if(!reason&&!["self_serve","assisted"].includes(segment))reason="Unknown segment";
  if(!reason&&now<start+7*DAY)reason="Incomplete seven-day window";
  if(reason){excluded.push({account_id:id,reason});continue;}
  const window=sorted.filter(e=>time(e.timestamp)>=start&&time(e.timestamp)<=start+7*DAY&&time(e.timestamp)<=now);
  if(window.length!==sorted.length)warnings.push("Outside-window events ignored: "+id);
  let connected=false,workflow=false,runs=0;
  for(const e of window){if(e.event==="connected")connected=true;if(e.event==="workflow_created"){if(connected)workflow=true;else warnings.push("Workflow before connection ignored: "+id);}if(e.event==="run_success"){if(workflow)runs++;else warnings.push("Run before workflow ignored: "+id);}}
  rows.push({account_id:id,segment,signed_up:1,connected:+connected,first_workflow:+workflow,activated_7d:+(runs>=3),successful_runs:runs});
 }
 return {rows,excluded,warnings};
}
function funnel(rows,segment="all"){
 const selected=rows.filter(r=>segment==="all"||r.segment===segment);
 const counts=["signed_up","connected","first_workflow","activated_7d"].map(k=>selected.reduce((n,r)=>n+r[k],0));
 return {counts,activation:ratio(counts[3],counts[0]),losses:counts.slice(0,3).map((n,i)=>n-counts[i+1]),accounts:selected.length};
}
const API={validateEvents,funnel};

if(typeof module!=="undefined"&&module.exports)module.exports=API;else window.Product=API;
})();
