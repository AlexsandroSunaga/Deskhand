from typing import Any

from pydantic import BaseModel, Field


class AgentRequest(BaseModel):
    message: str = Field(min_length=1, max_length=4000)


class ToolStep(BaseModel):
    tool: str
    input: dict[str, Any]
    output: str


class AgentResponse(BaseModel):
    reply: str
    steps: list[ToolStep]
    mode: str = "deterministic_router"


class ToolDefinition(BaseModel):
    name: str
    description: str
    parameters: list[str]


class HealthResponse(BaseModel):
    status: str
    version: str
    openaiConfigured: bool
    toolsRegistered: int
