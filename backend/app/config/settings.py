from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    ENVIRONMENT: str = "dev"
    OPENAI_API_KEY: str = ""
    GOOGLE_API_KEY: str = ""

    class Config:
        env_file = ".env"

settings = Settings()
