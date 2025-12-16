from app.agents.base_agent import BaseAgent
from langchain_core.prompts import PromptTemplate
from langchain_core.output_parsers import JsonOutputParser
from typing import Dict, Any

class ClinicalAgent(BaseAgent):
    def analyze(self, query: str) -> Dict[str, Any]:
        prompt = PromptTemplate.from_template(
            """You are a Clinical Trials Expert. 
            Analyze the following query for clinical trial data constraints and opportunities: {query}.
            
            Return a JSON object with the following keys:
            - "trials_found": list of trial summaries
            - "safety_signals": list of safety concerns (e.g., side effects)
            - "phase_distribution": dict of phase counts (Phase I, II, III)
            - "status": "success" or "failure" (if major safety issues found)
            
            Do not include markdown formatting like ```json.
            """
        )
        chain = prompt | self.llm | JsonOutputParser()
        return chain.invoke({"query": query})

class PatentAgent(BaseAgent):
    def analyze(self, query: str) -> Dict[str, Any]:
        prompt = PromptTemplate.from_template(
            """You are a Patent Landscape Expert. 
            Search for existing patents and white space opportunities for: {query}.
            
            Return a JSON object with the following keys:
            - "patents_found": list of key patents
            - "white_space": description of opportunities
            - "freedom_to_operate": boolean
            
            Do not include markdown formatting like ```json.
            """
        )
        chain = prompt | self.llm | JsonOutputParser()
        return chain.invoke({"query": query})

class IQVIAAgent(BaseAgent):
    def analyze(self, query: str) -> Dict[str, Any]:
        prompt = PromptTemplate.from_template(
            """You are a Market Insights Expert (IQVIA role). 
            Focus on sales data and market trends for: {query}.
            
            Return a JSON object with the following keys:
            - "market_size": string (e.g. "4.2B USD")
            - "cagr": string (e.g. "7.8%")
            - "competitors": list of competitor names
            - "forecast": brief qualitative forecast
            
            Do not include markdown formatting like ```json.
            """
        )
        chain = prompt | self.llm | JsonOutputParser()
        return chain.invoke({"query": query})

