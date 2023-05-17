import logging

from fastapi import APIRouter, HTTPException

from app.schemas.agent import AgentRequest, AgentResponse, ToolDefinition
from app.services.agent import TOOL_DEFINITIONS, list_orders, run_agent

router = APIRouter(prefix="/api/v1", tags=["agent"])
logger = logging.getLogger("acme.support.agent")


@router.get("/tools", response_model=list[ToolDefinition])
def tools() -> list[ToolDefinition]:
    return [ToolDefinition(**t) for t in TOOL_DEFINITIONS]


@router.get("/orders")
def orders() -> list[dict]:
    return list_orders()


@router.get("/knowledge")
def knowledge() -> list[dict]:
    from app.services.agent import KB_ARTICLES

    return KB_ARTICLES


@router.post("/agent", response_model=AgentResponse)
def agent(body: AgentRequest) -> AgentResponse:
    message = body.message.strip()
    if not message:
        raise HTTPException(400, "message required")
    result = run_agent(message)
    logger.info("agent_turn tools=%s", [s.tool for s in result["steps"]])
    return AgentResponse(reply=result["reply"], steps=result["steps"])
