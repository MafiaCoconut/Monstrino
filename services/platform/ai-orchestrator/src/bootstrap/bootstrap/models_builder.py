import os

from app.container_components import Models
from domain.enum import OllamaModels
from infra.interfaces_impl.http_client import HttpClient
from infra.interfaces_impl.mistral_ollama_client import MistralOllamaClient


def build_models():
    return Models(
        mistral=MistralOllamaClient(
            base_url=os.getenv("OLLAMA_URL", "http://localhost:11434"),
            http_client=HttpClient(),
        )
    )