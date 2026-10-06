import os

from fastapi import APIRouter

router = APIRouter(prefix="/integrations", tags=["integrations"])


@router.get("/status")
def integration_status():
    return {
        "openai": {"enabled": bool(os.getenv("OPENAI_API_KEY"))},
        "stripe": {"enabled": bool(os.getenv("STRIPE_SECRET_KEY"))},
        "sendgrid": {"enabled": bool(os.getenv("SENDGRID_API_KEY"))},
        "intercom": {"enabled": bool(os.getenv("INTERCOM_ACCESS_TOKEN"))},
    }
