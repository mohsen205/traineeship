from typing import Optional
from pydantic import BaseSettings


class Settings(BaseSettings):
    database_username: str
    database_password: Optional[str] = ""
    database_name: str
    server_name: str
    database_port: str

    secret_key: str
    algorithm: str
    access_token_expire_minutes: int

    email_address: str
    email_password: str

    client_secret_file: str
    api_name: str
    api_version: str
    scopes: str = ['https://www.googleapis.com/auth/drive']
    folder_id: str

    yahoo_api_key: str

    class Config:
        env_file = ".env"


settings = Settings()
