from fastapi.testclient import TestClient

from relayops.api import app

client = TestClient(app)


def test_health() -> None:
    assert client.get("/health").json() == {
        "status": "ready",
        "mode": "deterministic",
        "data": "synthetic",
    }


def test_triage_endpoint() -> None:
    response = client.post(
        "/triage", json={"request_id": "SYN-1", "description": "water leak", "location": "Zone 2"}
    )
    assert response.status_code == 200
    assert response.json()["route"] == "water-response"


def test_validation_rejects_empty_description() -> None:
    assert (
        client.post(
            "/triage", json={"request_id": "SYN-1", "description": "", "location": "Zone 2"}
        ).status_code
        == 422
    )
