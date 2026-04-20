import pytest

from app.interfaces.llm_client_interface import LLMClientInterface
from infra.llm_clients.ollama_client import OllamaClient


@pytest.fixture
def ollama_client(http_client)-> LLMClientInterface:
    return OllamaClient(
        base_url="http://localhost:11434",
        http_client=http_client
    )