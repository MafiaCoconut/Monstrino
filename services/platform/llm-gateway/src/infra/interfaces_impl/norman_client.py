import json
from typing import Optional, Any

from domain.services import JsonSchemaGenerator
from icecream import ic
from domain.enum import OllamaModels
from domain.vault_obj import OllamaRequest
from infra.interfaces_impl.ollama_client import OllamaClient
from pydantic import BaseModel

class NormanClient:
    def __init__(self, base_url: str):
        ...