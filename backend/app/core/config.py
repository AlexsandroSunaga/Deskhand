from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    app_name: str = "Deskhand Agent API"
    app_version: str = "2.1.0"
    cors_origins: str = "http://localhost:3001,http://127.0.0.1:3001"
    log_level: str = "INFO"
    openai_api_key: str = ""


settings = Settings()
