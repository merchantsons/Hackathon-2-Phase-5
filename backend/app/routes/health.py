from fastapi import APIRouter
import time
import json
import logging

router = APIRouter()
logger = logging.getLogger(__name__)

# Phase V: simple in-memory metrics for observability (autoscaling can use CPU/memory from K8s)
_metrics = {"requests_total": 0, "started_at": time.time()}


def _structured_log(level: str, message: str, **kwargs):
    log_event = {"timestamp": time.time(), "level": level, "message": message, **kwargs}
    logger.log(getattr(logging, level.upper(), logging.INFO), json.dumps(log_event))


@router.get("/health")
async def health_check():
    return {"status": "healthy", "service": "todo-api"}


@router.get("/metrics")
async def metrics():
    """Simple JSON metrics endpoint (Phase V). For Prometheus, use a sidecar or adapter."""
    uptime_seconds = time.time() - _metrics["started_at"]
    return {
        "service": "todo-api",
        "requests_total": _metrics["requests_total"],
        "uptime_seconds": round(uptime_seconds, 2),
    }
