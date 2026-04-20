import json
from typing import Optional, Any

from domain.services import JsonSchemaGenerator
from icecream import ic
from domain.enum import OllamaModels
from pydantic import BaseModel

class NormanClient:
    def __init__(self, base_url: str):
        ...