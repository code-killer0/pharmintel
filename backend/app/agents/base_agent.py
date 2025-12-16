from langchain_google_genai import ChatGoogleGenerativeAI
from app.config.settings import settings

class BaseAgent:
    def __init__(self, model_name: str = "gemini-1.5-flash"):
        self.llm = ChatGoogleGenerativeAI(
            model=model_name,
            google_api_key=settings.GOOGLE_API_KEY,
            temperature=0.7
        )

    def get_llm(self):
        return self.llm
