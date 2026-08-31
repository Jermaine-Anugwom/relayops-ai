"use client";
import { useState } from "react";

const evidence = [["Source","Resident web intake","VERIFIED"],["Location","Zone 4 · West transit lane","VERIFIED"],["Signal","Water covering active roadway","VERIFIED"],["Unknown","Exact depth and spread","REVIEW"]];
const timeline = [["14:06","Request normalized","complete"],["14:06","Injection scan clear","complete"],["14:07","Jurisdiction matched","complete"],["14:07","Operator decision","active"]];

export default function Page(){
  const [showRationale,setShowRationale]=useState(false); const [state,setState]=useState("uncertain");
  return <main><a className="skip" href="#decision">Skip to decision</a>
    <header><div className="wordmark"><span>RO</span><strong>RelayOps</strong></div><nav aria-label="Demonstration state">{["healthy","uncertain","blocked","empty"].map(item=><button key={item} aria-pressed={state===item} onClick={()=>setState(item)}>{item}</button>)}</nav><b>SYNTHETIC DATA</b></header>
    <section className="dispatch-head"><div><p>Decision packet SYN-1042</p><h1>Water is crossing an active transit lane.</h1></div><dl><div><dt>Received</dt><dd>14:06 CT</dd></div><div><dt>Urgency</dt><dd>CRITICAL</dd></div><div><dt>Confidence</dt><dd>0.91</dd></div></dl></section>
    <div className="dispatch-grid" data-demo-state={state}>
      <aside className="chronology" aria-label="Decision chronology"><h2>Chronology</h2><ol>{timeline.map(([time,label,status])=><li key={label} data-status={status}><time>{time}</time><span>{label}</span></li>)}</ol><p className="boundary">No route is dispatched from this demonstration.</p></aside>
      <section className="decision" id="decision"><div className="decision-title"><div><span>Recommended route</span><h2>Water Response · Crew 2</h2></div><strong>READY FOR HUMAN CHECK</strong></div><div className="evidence-table" role="table" aria-label="Decision evidence">{evidence.map(([field,value,status])=><div role="row" key={field}><span role="cell">{field}</span><b role="cell">{value}</b><em role="cell" data-status={status}>{status}</em></div>)}</div><button className="rationale-toggle" aria-expanded={showRationale} onClick={()=>setShowRationale(!showRationale)}>{showRationale?"Hide routing rationale":"Inspect routing rationale"}</button>{showRationale&&<div className="rationale"><b>Why this route</b><p>Water hazard language, a verified Zone 4 location, and roadway exposure satisfy the deterministic Water Response policy. Exact depth remains unresolved and is carried into the crew brief.</p></div>}</section>
      <aside className="jurisdiction" aria-label="Jurisdiction and next action"><div className="zone-map" aria-label="Synthetic jurisdiction map"><span className="z1">Z1</span><span className="z2">Z2</span><span className="z3">Z3</span><span className="z4">Z4<br/><b>INCIDENT</b></span></div><h2>Next safe action</h2><p>Verify roadway depth, then release the prebuilt crew brief through an authorized channel.</p><button disabled>External dispatch disabled</button></aside>
    </div><footer><span>Deterministic policy · hash 8f03b6d1</span><span>Offline inspection available</span></footer>
    <script type="application/json" data-impeccable-contract dangerouslySetInnerHTML={{__html:JSON.stringify({core_job:"Turn an ambiguous field-service intake into an evidence-backed routing decision.",hero_action:"Inspect the recommended route and the unresolved evidence before release.",required_states:["healthy","uncertain","blocked","empty"],forbidden_shortcuts:["generic dashboard cards","hidden uncertainty","automatic dispatch"],visual_commitment:"A civic dispatch sheet derived from concept seed 19497e5c."})}} />
  </main>;
}
