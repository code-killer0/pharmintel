from typing import TypedDict, Annotated, List, Dict, Any, Union
from langgraph.graph import StateGraph, END
import operator

class AgentState(TypedDict):
    query: str
    hypothesis: str
    iteration: int
    max_iterations: int
    
    # Reports
    clinical_report: Dict[str, Any]
    patent_report: Dict[str, Any]
    market_report: Dict[str, Any]
    
    # Analysis & verification
    verification_result: str # "success" or "failure"
    failure_reason: str
    pivot_recommendation: str
    
    final_report: str
    messages: Annotated[List[str], operator.add]
