import pytest
from application.interfaces.ollama_client_interface import OllamaClientInterface
from infra.interfaces_impl.ollama_client import OllamaClient


@pytest.fixture
def ollama_client(http_client)-> OllamaClientInterface:
    return OllamaClient(
        base_url="http://localhost:11434",
        http_client=http_client
    )