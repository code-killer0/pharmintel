from typing import TypedDict, Annotated, List, Dict, Any, Literal
from langgraph.graph import StateGraph, END
from app.core.state import AgentState
from app.agents.specialized_agents import ClinicalAgent, PatentAgent, IQVIAAgent
from app.agents.base_agent import BaseAgent
from langchain_core.prompts import PromptTemplate
from langchain_core.output_parsers import JsonOutputParser

# --- Helper Nodes ---

def planner_node(state: AgentState):
    """Decomposes query into a hypothesis."""
    query = state["query"]
    agent = BaseAgent()
    prompt = PromptTemplate.from_template(
        "You are a Research Planner. Formulate a scientific hypothesis for: {query}. Return just the hypothesis string."
    )
    res = (prompt | agent.llm).invoke({"query": query})
    return {
        "hypothesis": res.content,
        "iteration": 0,
        "max_iterations": 3
    }

def failure_analysis_node(state: AgentState):
    """Analyzes failure and suggests pivot."""
    agent = BaseAgent()
    prompt = PromptTemplate.from_template(
        """Analyze why the research failed based on:
        Clinical: {clinical}
        Patent: {patent}
        
        Suggest a NEW scientific pivot (e.g. new delivery mechanism, salt form).
        Return just the pivot suggestion string.
        """
    )
    res = (prompt | agent.llm).invoke({
        "clinical": str(state.get("clinical_report")),
        "patent": str(state.get("patent_report"))
    })
    return {
        "pivot_recommendation": res.content,
        "iteration": state["iteration"] + 1,
        "query": f"{state['query']} + Pivot: {res.content}" # Update query for next loop
    }

def verification_node(state: AgentState):
    """Checks if results meet criteria."""
    clinical = state.get("clinical_report", {})
    patent = state.get("patent_report", {})
    
    # Simple logic: if clinical status is failure, we fail
    success = True
    reason = ""
    
    if isinstance(clinical, dict) and clinical.get("status") == "failure":
        success = False
        reason = "Clinical safety signals detected."
    elif not patent.get("freedom_to_operate", True):
        success = False
        reason = "Patent blockage."
        
    return {
        "verification_result": "success" if success else "failure",
        "failure_reason": reason
    }

# --- Agent Nodes ---

def clinical_node(state: AgentState):
    agent = ClinicalAgent()
    return {"clinical_report": agent.analyze(state["query"])}

def patent_node(state: AgentState):
    agent = PatentAgent()
    return {"patent_report": agent.analyze(state["query"])}

def market_node(state: AgentState):
    agent = IQVIAAgent()
    return {"market_report": agent.analyze(state["query"])}

def aggregator_node(state: AgentState):
    report = f"""
    # Strategic Innovation Report
    ## Hypothesis
    {state.get('hypothesis')}
    
    ## Status: {state.get('verification_result')}
    
    ## Findings
    - Clinical: {state.get('clinical_report')}
    - Patent: {state.get('patent_report')}
    - Market: {state.get('market_report')}
    
    ## Pivot History
    {state.get('pivot_recommendation', 'None')}
    """
    return {"final_report": report}

# --- Router ---

def route_verification(state: AgentState) -> Literal["failure_analysis", "aggregator"]:
    if state["verification_result"] == "failure":
        if state["iteration"] < state.get("max_iterations", 1):
            return "failure_analysis"
    return "aggregator"

# --- Graph Construction ---

workflow = StateGraph(AgentState)

workflow.add_node("planner", planner_node)
workflow.add_node("clinical", clinical_node)
workflow.add_node("patent", patent_node)
workflow.add_node("market", market_node)
workflow.add_node("verifier", verification_node)
workflow.add_node("failure_analysis", failure_analysis_node)
workflow.add_node("aggregator", aggregator_node)

# Flow
workflow.set_entry_point("planner")

# Parallel Agents
workflow.add_edge("planner", "clinical")
workflow.add_edge("planner", "patent")
workflow.add_edge("planner", "market")

# Verification
workflow.add_edge("clinical", "verifier")
workflow.add_edge("patent", "verifier")
workflow.add_edge("market", "verifier")

# Conditional Logic
workflow.add_conditional_edges(
    "verifier",
    route_verification,
    {
        "failure_analysis": "failure_analysis",
        "aggregator": "aggregator"
    }
)

# Loop back
workflow.add_edge("failure_analysis", "planner")
workflow.add_edge("aggregator", END)

master_graph = workflow.compile()
