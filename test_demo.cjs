"use strict";
const assert=require("node:assert/strict");const {test}=require("node:test");const fs=require("node:fs");const vm=require("node:vm");const path=require("node:path");const P=require("./demo/engine.js");const context={window:{}};vm.runInNewContext(fs.readFileSync(path.join(__dirname,"demo/data.js"),"utf8"),context);const data=JSON.parse(JSON.stringify(context.window.DEMO_DATA));const person={tenant:"alpha",role:"support",revoked:false};

const cutoff="2026-01-09T00:00:00Z";
test("generated events reproduce baseline funnel",()=>{const r=P.validateEvents(data,cutoff);assert.deepEqual(P.funnel(r.rows).counts,[40,30,23,16]);});
test("duplicate event is deduplicated",()=>{const r=P.validateEvents([...data,data[0]],cutoff);assert.deepEqual(P.funnel(r.rows).counts,[40,30,23,16]);assert.equal(r.warnings.length,1);});
test("out-of-order events are normalized",()=>{const r=P.validateEvents(data.slice().reverse(),cutoff);assert.deepEqual(P.funnel(r.rows).counts,[40,30,23,16]);});
test("incomplete window excluded from denominator",()=>{const r=P.validateEvents(data,"2026-01-05T00:00:00Z");assert.equal(r.excluded.length,40);assert.equal(P.funnel(r.rows).activation,null);});
test("missing signup excludes account",()=>{const r=P.validateEvents(data.filter(e=>!(e.account_id==="A001"&&e.event==="signup")),cutoff);assert.equal(r.excluded.length,1);});
test("conflicting duplicate excludes affected account",()=>{const r=P.validateEvents([...data,{...data[0],event:"connected"}],cutoff);assert.equal(r.excluded.length,1);});
test("self-serve and assisted denominators reconcile",()=>{const r=P.validateEvents(data,cutoff);assert.equal(P.funnel(r.rows,"self_serve").activation,.2);assert.equal(P.funnel(r.rows,"assisted").activation,.6);});
test("invalid date rejected",()=>{assert.throws(()=>P.validateEvents(data,"bad-date"));});
