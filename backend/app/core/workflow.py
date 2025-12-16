from typing import TypedDict, Annotated, List
from langgraph.graph import StateGraph, END
from app.agents.specialized_agents import ClinicalAgent, PatentAgent, IQVIAAgent

class AgentState(TypedDict):
    query: str
    clinical_report: str
    patent_report: str
    market_report: str
    final_report: str

def clinical_node(state: AgentState):
    agent = ClinicalAgent()
    result = agent.analyze(state["query"])
    return {"clinical_report": result}

def patent_node(state: AgentState):
    agent = PatentAgent()
    result = agent.analyze(state["query"])
    return {"patent_report": result}

def market_node(state: AgentState):
    agent = IQVIAAgent()
    result = agent.analyze(state["query"])
    return {"market_report": result}

def aggregator_node(state: AgentState):
    # Simple aggregation for now
    report = f"""
    # PharmaIntel Consolidated Report
    
    ## Clinical Analysis
    {state.get('clinical_report', 'N/A')}
    
    ## Patent Landscape
    {state.get('patent_report', 'N/A')}
    
    ## Market Insights
    {state.get('market_report', 'N/A')}
    """
    return {"final_report": report}

workflow = StateGraph(AgentState)

# Add nodes
workflow.add_node("clinical", clinical_node)
workflow.add_node("patent", patent_node)
workflow.add_node("market", market_node)
workflow.add_node("aggregator", aggregator_node)

# Define edges (Parallel execution for efficiency)
workflow.set_entry_point("clinical")
workflow.add_edge("clinical", "patent")
workflow.add_edge("patent", "market")
workflow.add_edge("market", "aggregator")
workflow.add_edge("aggregator", END)

master_graph = workflow.compile()
