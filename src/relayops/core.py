from __future__ import annotations

import json
import re
from dataclasses import asdict, dataclass
from hashlib import sha256

URGENT = ("gas leak", "downed line", "flooding", "fire", "sinkhole")
INJECTION = (r"ignore .*instructions", r"reveal .*secret", r"system message", r"execute .*command")


@dataclass(frozen=True)
class Request:
    request_id: str
    description: str
    location: str | None
    channel: str = "web"


@dataclass(frozen=True)
class Decision:
    request_id: str
    category: str
    urgency: str
    route: str
    confidence: float
    state: str
    reasons: tuple[str, ...]
    evidence_hash: str


def triage(r: Request) -> Decision:
    text = r.description.lower()
    reasons = []
    if any(re.search(p, text, re.IGNORECASE) for p in INJECTION):
        reasons.append("untrusted instruction pattern")
    if not r.location:
        reasons.append("location required for dispatch")
    category = (
        "water"
        if any(x in text for x in ("water", "flood", "hydrant"))
        else "road"
        if any(x in text for x in ("pothole", "road", "sinkhole"))
        else "utility"
        if any(x in text for x in ("line", "gas", "power"))
        else "general"
    )
    urgency = "critical" if any(x in text for x in URGENT) else "standard"
    confidence = 0.96 if category != "general" and r.location else 0.58
    state = "review" if reasons or confidence < 0.75 else "ready"
    route = {
        "water": "water-response",
        "road": "public-works",
        "utility": "utility-liaison",
        "general": "service-desk",
    }[category]
    digest = sha256(json.dumps(asdict(r), sort_keys=True).encode()).hexdigest()
    return Decision(
        r.request_id, category, urgency, route, confidence, state, tuple(reasons), digest
    )
