import pytest
from application.interfaces.http_client_interface import HttpClientInterface
from application.interfaces.ollama_client_interface import OllamaClientInterface
from infra.interfaces_impl.http_client import HttpClient


@pytest.fixture
def http_client() -> HttpClientInterface:
    return HttpClient()