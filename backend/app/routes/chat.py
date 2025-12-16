from fastapi import APIRouter
from pydantic import BaseModel
from app.core.workflow import master_graph

router = APIRouter(prefix="/chat", tags=["chat"])

class QueryRequest(BaseModel):
    query: str

@router.post("/ask")
async def ask_agent(request: QueryRequest):
    # LangGraph invoke returns the final state
    final_state = master_graph.invoke({"query": request.query})
    return {
        "response": final_state.get("final_report"),
        "debug_info": {
            "clinical": final_state.get("clinical_report"),
            "patent": final_state.get("patent_report"),
            "market": final_state.get("market_report")
        }
    }
