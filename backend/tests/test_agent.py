def ask(client, message):
    r = client.post("/api/v1/agent", json={"message": message})
    assert r.status_code == 200, r.text
    return r.json()


def test_health(client):
    body = client.get("/health").json()
    assert body["status"] == "ok"
    assert body["toolsRegistered"] == 3


def test_order_lookup_uses_order_tool(client):
    body = ask(client, "Where is ORD-1001?")
    assert [s["tool"] for s in body["steps"]] == ["get_order_status"]
    assert "shipped" in body["reply"]
    assert body["steps"][0]["input"] == {"orderId": "ORD-1001"}


def test_unknown_order(client):
    body = ask(client, "status of ord-9999")
    assert "not found" in body["reply"]


def test_refund_policy_searches_knowledge_base(client):
    body = ask(client, "What is your refund policy?")
    assert body["steps"][0]["tool"] == "search_knowledge"
    assert "5–7 business days" in body["reply"]


def test_escalate_to_human(client):
    body = ask(client, "I want to escalate to a human")
    assert body["steps"][0]["tool"] == "create_escalation"
    assert "Escalation" in body["reply"]


def test_unmatched_question_falls_back_to_escalation(client):
    body = ask(client, "Tell me about quantum computing")
    assert [s["tool"] for s in body["steps"]] == ["search_knowledge", "create_escalation"]


def test_validation_errors(client):
    assert client.post("/api/v1/agent", json={"message": ""}).status_code == 422
    assert client.post("/api/v1/agent", json={}).status_code == 422
    assert client.post("/api/v1/agent", json={"message": "   "}).status_code == 400


def test_tools_orders_knowledge_listings(client):
    assert len(client.get("/api/v1/tools").json()) == 3
    assert {o["id"] for o in client.get("/api/v1/orders").json()} >= {"ORD-1001"}
    assert len(client.get("/api/v1/knowledge").json()) >= 3
