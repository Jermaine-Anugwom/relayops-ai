# RelayOps AI

**Evidence-bound intake and routing for synthetic municipal field operations.**

> All people, organizations, records, measurements, and outcomes in this
> repository are synthetic.

![RelayOps AI desktop operating view](.impeccable/review/desktop.png)

[Open the live demonstration](https://jermaine-anugwom.github.io/relayops-ai/)

## The operational problem

Operations teams receive incomplete, duplicated, urgent, and sometimes hostile service requests through inconsistent channels.

## The proof

A deterministic category, urgency, and route classifier that sends suspicious instructions, missing locations, and low-confidence requests to review. Each input receives a stable evidence fingerprint.

## Why this is forward deployed

The project begins with the operator's decision, uncertainty, failure cost,
integration boundary, and handoff—not with a model demo. It makes policy and
evidence inspectable, preserves human authority for consequential cases, and
remains useful when the optional model layer is unavailable.

## Architecture

```mermaid
flowchart LR
  A[Resident intake] --> B[Schema + injection guard]
  B --> C[Urgency classifier]
  C --> D[Jurisdiction policy]
  D --> E{Evidence complete?}
  E -->|yes| F[Human-checkable route]
  E -->|no| G[Abstain + review]
  F --> H[Stable input fingerprint]
  G --> H
```

## Quickstart

```bash
python3.12 -m venv .venv
source .venv/bin/activate
python -m pip install -c constraints.txt -e '.[dev]'
pytest -q
relayops
```

No API key or network connection is required.

Run the interface and API demonstrations side by side with `docker compose up --build`; the interface is available on port 3000 and the API on port 8000. The visual fixture is intentionally static and does not claim to be API-produced evidence.

## Evaluation and limitations

Run `pytest -q` for the reproducible evaluation. The fixture set is deliberately
synthetic and cannot establish production performance. A real deployment would
require operator observation, representative data, policy review, privacy review,
security testing, and a monitored rollout.

## Project documents

- [Field discovery and handoff](FIELD_NOTES.md)
- [Security boundaries](SECURITY.md)
- [Operating runbook](RUNBOOK.md)
- [Development provenance](DEVELOPMENT.md)
- [Release history](CHANGELOG.md)

## Topics

`forward-deployed-ai`, `govtech`, `fastapi`, `nextjs`, `human-in-the-loop`, `ai-evals`
