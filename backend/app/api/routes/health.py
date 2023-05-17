from fastapi import APIRouter

from app.core.config import settings
from app.schemas.agent import HealthResponse
from app.services.agent import TOOL_DEFINITIONS

router = APIRouter(tags=["health"])


@router.get("/health", response_model=HealthResponse)
def health() -> HealthResponse:
    return HealthResponse(
        status="ok",
        version=settings.app_version,
        openaiConfigured=bool(settings.openai_api_key),
        toolsRegistered=len(TOOL_DEFINITIONS),
    )
