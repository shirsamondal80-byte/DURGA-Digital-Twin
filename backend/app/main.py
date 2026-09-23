from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .schemas import TelemetryPayload
from .telemetry import (
    get_latest_telemetry,
    update_telemetry,
)
from .ai_result import (
    get_latest_ai_result,
    update_ai_result,
)


app = FastAPI(
    title="PROJECT DURGA API",
    description="Digital Twin backend for MALE UAV engine monitoring",
    version="1.0.0",
)


# =========================================================
# CORS
# =========================================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


# =========================================================
# ROOT
# =========================================================

@app.get("/")
def root():
    return {
        "project": "PROJECT DURGA",
        "service": "Digital Twin Backend",
        "status": "online",
    }


# =========================================================
# HEALTH
# =========================================================

@app.get("/health")
def health():
    return {
        "status": "healthy",
        "service": "durga-backend",
    }


# =========================================================
# TELEMETRY — LAP1 → LAP2
# =========================================================

@app.post("/telemetry")
def receive_telemetry(
    payload: TelemetryPayload
):
    telemetry = update_telemetry(payload)

    return {
        "status": "received",
        "message": "Engine telemetry updated successfully.",
        "telemetry": telemetry,
    }


@app.get("/telemetry")
def read_telemetry():
    telemetry = get_latest_telemetry()

    if telemetry is None:
        return {
            "status": "no_telemetry",
            "message": "No telemetry has been received yet.",
            "telemetry": None,
        }

    return {
        "status": "available",
        "telemetry": telemetry,
    }


# =========================================================
# AI ANALYSIS — LAP1 → LAP2
# =========================================================

@app.post("/ai-analysis")
def receive_ai_analysis(
    result: dict
):
    ai_result = update_ai_result(result)

    return {
        "status": "received",
        "message": "AI analysis received successfully.",
        "ai_analysis": ai_result,
    }


@app.get("/ai-analysis")
def read_ai_analysis():
    ai_result = get_latest_ai_result()

    if ai_result is None:
        return {
            "status": "no_ai_analysis",
            "message": "No AI analysis has been received yet.",
            "ai_analysis": None,
        }

    return {
        "status": "available",
        "ai_analysis": ai_result,
    }