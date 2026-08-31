from dataclasses import asdict

from fastapi import FastAPI
from pydantic import BaseModel, Field

from .core import Request, triage

app = FastAPI(title="RelayOps AI", version="0.1.0")


class Intake(BaseModel):
    request_id: str = Field(min_length=1, max_length=64)
    description: str = Field(min_length=1, max_length=2000)
    location: str | None = Field(default=None, max_length=160)
    channel: str = Field(default="web", max_length=32)


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ready", "mode": "deterministic", "data": "synthetic"}


@app.post("/triage")
def triage_request(payload: Intake) -> dict[str, object]:
    return asdict(triage(Request(**payload.model_dump())))
