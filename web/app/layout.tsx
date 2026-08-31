import "./style.css";
export const metadata={title:"RelayOps AI — Synthetic Dispatch Decision",description:"Evidence-bound synthetic municipal dispatch demonstration."};
const contract=`THESIS: A civic dispatch decision packet, never a hero-metric dashboard.
OWN-WORLD: Municipal ledger paper, navy rules, jurisdiction blue, vermilion incident stamps, square geometry.
STORY: Follow intake chronology, inspect evidence and routing rationale, then identify the next safe human action.
FIRST VIEWPORT: Chronology rail, dominant decision sheet, and jurisdiction map form one auditable horizontal instrument.
FORM: Public-works dispatch console, grounded candidate 4, seed 19497e5c.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance`;
export default function Layout({children}:Readonly<{children:React.ReactNode}>){return <html lang="en"><body><script type="application/json" data-impeccable-contract dangerouslySetInnerHTML={{__html:JSON.stringify(contract)}}/>{children}</body></html>}
