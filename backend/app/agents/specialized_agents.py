from app.agents.base_agent import BaseAgent
from langchain.prompts import PromptTemplate

class ClinicalAgent(BaseAgent):
    def __init__(self):
        super().__init__()
    
    def analyze(self, query: str):
        prompt = PromptTemplate.from_template(
            "You are a Clinical Trials Expert. Analyze the following query for clinical trial data constraints and opportunities: {query}"
        )
        chain = prompt | self.llm
        return chain.invoke({"query": query}).content

class PatentAgent(BaseAgent):
    def __init__(self):
        super().__init__()
    
    def analyze(self, query: str):
        prompt = PromptTemplate.from_template(
            "You are a Patent Landscape Expert. Search for existing patents and white space opportunities for: {query}"
        )
        chain = prompt | self.llm
        return chain.invoke({"query": query}).content

class IQVIAAgent(BaseAgent):
    def __init__(self):
        super().__init__()
    
    def analyze(self, query: str):
        prompt = PromptTemplate.from_template(
            "You are a Market Insights Expert (IQVIA role). specific focus on sales data and market trends for: {query}"
        )
        chain = prompt | self.llm
        return chain.invoke({"query": query}).content
