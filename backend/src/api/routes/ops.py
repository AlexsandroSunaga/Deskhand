from fastapi import APIRouter

router = APIRouter(prefix="/ops", tags=["ops"])


@router.get("/metrics")
def ops_metrics():
    return {
        "conversations_today": 42,
        "avg_first_response_sec": 18,
        "human_handoff_rate": 0.08,
        "kb_documents": 128,
        "eval_pass_rate": 0.91,
    }
