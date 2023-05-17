# ACME Support Agent API

FastAPI service for the support console: health, tool registry, KB catalog, and **`POST /api/v1/agent`**.

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate   # Windows
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8001
```

OpenAPI: http://127.0.0.1:8001/docs

The Next.js app proxies `/api/agent` to this service when `AGENT_API_URL=http://127.0.0.1:8001` is set.
