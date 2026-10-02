from fastapi import APIRouter

from src.config.manager import get_settings
from src.models.schemas.agent import HealthResponse
from src.services.agent import TOOL_DEFINITIONS

router = APIRouter(tags=["health"])


@router.get("/health", response_model=HealthResponse)
def health() -> HealthResponse:
    settings = get_settings()
    return HealthResponse(
        status="ok",
        version=settings.app_version,
        openaiConfigured=bool(settings.openai_api_key),
        toolsRegistered=len(TOOL_DEFINITIONS),
    )
