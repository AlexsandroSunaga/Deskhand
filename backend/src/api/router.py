from fastapi import APIRouter

from src.api.routes import agent, integrations, ops

api_router = APIRouter()
api_router.include_router(agent.router)
api_router.include_router(integrations.router)
api_router.include_router(ops.router)
