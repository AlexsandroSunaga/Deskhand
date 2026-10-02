import logging
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from src.api.middleware.request_id import RequestIdMiddleware
from src.api.router import api_router
from src.api.routes import health
from src.config.manager import get_settings
from src.repository.events import init_database_tables
from src.utilities.logging import configure_logging

logger = logging.getLogger("acme.support")


@asynccontextmanager
async def lifespan(_: FastAPI):
    settings = get_settings()
    configure_logging(settings.log_level)
    logger.info("starting %s v%s", settings.app_name, settings.app_version)
    await init_database_tables()
    yield


def create_application() -> FastAPI:
    settings = get_settings()
    app = FastAPI(
        title=settings.app_name,
        version=settings.app_version,
        lifespan=lifespan,
        description="Tool-calling support agent API (deterministic router; plug in OpenAI for production).",
    )
    app.add_middleware(RequestIdMiddleware)
    origins = [o.strip() for o in settings.cors_origins.split(",") if o.strip()]
    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins or ["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    app.include_router(health.router)
    app.include_router(api_router)
    return app


backend_app = create_application()
