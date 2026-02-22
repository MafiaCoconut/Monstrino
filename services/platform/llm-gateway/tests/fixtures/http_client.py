import pytest
from monstrino_api.interface import HttpClientInterface

from app.interfaces.ollama_client_interface import OllamaClientInterface
from infra.interfaces_impl.http_client import HttpClient


@pytest.fixture
def http_client() -> HttpClientInterface:
    return HttpClient()