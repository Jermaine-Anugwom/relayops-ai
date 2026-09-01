"use client";

import { useState } from "react";

type DemoState = "healthy" | "uncertain" | "blocked" | "empty";
type Evidence = [string, string, "VERIFIED" | "REVIEW" | "BLOCKED"];

const fixtures: Record<Exclude<DemoState, "empty">, { title: string; route: string; gate: string; urgency: string; evidence: Evidence[]; rationale: string }> = {
  healthy: {
    title: "A verified roadway hazard is ready for human release.",
    route: "Water Response · Crew 2",
    gate: "READY FOR HUMAN CHECK",
    urgency: "CRITICAL",
    evidence: [["Source", "Resident web intake", "VERIFIED"], ["Location", "Zone 4 · West transit lane", "VERIFIED"], ["Signal", "Water covering active roadway", "VERIFIED"], ["Depth", "Six inches at marked curb", "VERIFIED"]],
    rationale: "Verified location, measured depth, and roadway exposure satisfy the deterministic Water Response policy.",
  },
  uncertain: {
    title: "Water is crossing an active transit lane.",
    route: "Water Response · Crew 2",
    gate: "READY FOR HUMAN CHECK",
    urgency: "CRITICAL",
    evidence: [["Source", "Resident web intake", "VERIFIED"], ["Location", "Zone 4 · West transit lane", "VERIFIED"], ["Signal", "Water covering active roadway", "VERIFIED"], ["Unknown", "Exact depth and spread", "REVIEW"]],
    rationale: "Water-hazard language, a verified Zone 4 location, and roadway exposure satisfy routing policy. Exact depth remains unresolved and travels with the crew brief.",
  },
  blocked: {
    title: "Routing stopped on an untrusted instruction.",
    route: "No route released",
    gate: "BLOCKED FOR REVIEW",
    urgency: "HELD",
    evidence: [["Source", "Inbound message", "VERIFIED"], ["Location", "Zone 4 · West transit lane", "VERIFIED"], ["Signal", "Instruction override pattern", "BLOCKED"], ["Action", "Quarantine and inspect source", "REVIEW"]],
    rationale: "The intake contains an instruction directed at the processing system. Policy prevents classification or external release until a human inspects the original source.",
  },
};

const timeline = [["14:06", "Request normalized", "complete"], ["14:06", "Injection scan clear", "complete"], ["14:07", "Jurisdiction matched", "complete"], ["14:07", "Operator decision", "active"]];

export default function Page() {
  const [showRationale, setShowRationale] = useState(false);
  const [state, setState] = useState<DemoState>("uncertain");
  const fixture = state === "empty" ? null : fixtures[state];
  return <main><a className="skip" href="#decision">Skip to decision</a>
    <header><div className="wordmark"><span>RO</span><strong>RelayOps</strong></div><nav aria-label="Demonstration state">{(["healthy", "uncertain", "blocked", "empty"] as DemoState[]).map(item => <button key={item} aria-pressed={state === item} onClick={() => { setState(item); setShowRationale(false); }}>{item}</button>)}</nav><b>SYNTHETIC DATA</b></header>
    {fixture ? <>
      <section className="dispatch-head"><div><p>Decision packet SYN-1042</p><h1>{fixture.title}</h1></div><dl><div><dt>Received</dt><dd>14:06 CT</dd></div><div><dt>Urgency</dt><dd>{fixture.urgency}</dd></div><div><dt>Confidence</dt><dd>{state === "healthy" ? "0.97" : state === "blocked" ? "—" : "0.91"}</dd></div></dl></section>
      <div className="dispatch-grid" data-demo-state={state}>
        <aside className="chronology" aria-label="Decision chronology"><h2>Chronology</h2><ol>{timeline.map(([time, label, status]) => <li key={label} data-status={status}><time>{time}</time><span>{state === "blocked" && label === "Injection scan clear" ? "Injection scan blocked" : label}</span></li>)}</ol><p className="boundary">No route is dispatched from this demonstration.</p></aside>
        <section className="decision" id="decision"><div className="decision-title"><div><span>Recommended route</span><h2>{fixture.route}</h2></div><strong data-gate={state}>{fixture.gate}</strong></div><div className="evidence-table" role="table" aria-label="Decision evidence">{fixture.evidence.map(([field, value, status]) => <div role="row" key={field}><span role="cell">{field}</span><b role="cell">{value}</b><em role="cell" data-status={status}>{status}</em></div>)}</div><button className="rationale-toggle" aria-expanded={showRationale} onClick={() => setShowRationale(!showRationale)}>{showRationale ? "Hide routing rationale" : "Inspect routing rationale"}</button>{showRationale && <div className="rationale"><b>Why this route</b><p>{fixture.rationale}</p></div>}</section>
        <aside className="jurisdiction" aria-label="Jurisdiction and next action"><div className="zone-map" aria-label="Synthetic jurisdiction map"><span className="z1">Z1</span><span className="z2">Z2</span><span className="z3">Z3</span><span className="z4">Z4<br /><b>{state === "blocked" ? "HELD" : "INCIDENT"}</b></span></div><h2>Next safe action</h2><p>{state === "blocked" ? "Inspect the quarantined source. Do not classify or release a route." : state === "healthy" ? "Confirm crew availability, then release the verified brief through an authorized channel." : "Verify roadway depth, then release the prebuilt crew brief through an authorized channel."}</p><button disabled>External dispatch disabled</button></aside>
      </div>
    </> : <section className="empty-dispatch" id="decision"><span>NO ACTIVE PACKET</span><h1>The dispatch queue is clear.</h1><p>Choose another synthetic state to inspect evidence, routing policy, and safe-action boundaries.</p></section>}
    <footer><span>Deterministic policy · hash 8f03b6d1</span><span>Offline inspection available</span></footer>
    <script type="application/json" data-impeccable-contract dangerouslySetInnerHTML={{ __html: JSON.stringify({ core_job: "Turn an ambiguous field-service intake into an evidence-backed routing decision.", hero_action: "Inspect the recommended route and the unresolved evidence before release.", required_states: ["healthy", "uncertain", "blocked", "empty", "overflow"], forbidden_shortcuts: ["generic dashboard cards", "hidden uncertainty", "automatic dispatch"], visual_commitment: "A civic dispatch sheet derived from concept seed 19497e5c." }) }} />
  </main>;
}
