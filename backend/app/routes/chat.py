from fastapi import APIRouter
from pydantic import BaseModel
from app.core.workflow import master_graph

router = APIRouter(prefix="/chat", tags=["chat"])

class QueryRequest(BaseModel):
    query: str

@router.post("/ask")
async def ask_agent(request: QueryRequest):
    # Initialize state for the cyclic graph
    initial_state = {
        "query": request.query,
        "iteration": 0,
        "max_iterations": 3
    }
    
    final_state = master_graph.invoke(initial_state)
    
    return {
        "response": final_state.get("final_report"),
        "debug_info": {
            "hypothesis": final_state.get("hypothesis"),
            "clinical": final_state.get("clinical_report"),
            "patent": final_state.get("patent_report"),
            "market": final_state.get("market_report"),
            "pivot": final_state.get("pivot_recommendation"),
            "verification": final_state.get("verification_result")
        }
    }
