from fastapi import APIRouter

from src.api.routes import agent

api_router = APIRouter()
api_router.include_router(agent.router)
