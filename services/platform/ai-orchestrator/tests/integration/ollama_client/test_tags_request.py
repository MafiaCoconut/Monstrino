import pytest
from app.interfaces.ollama_client_interface import OllamaClientInterface


@pytest.mark.asyncio
async def test_tags_request(ollama_client: OllamaClientInterface):
    await ollama_client.tags(
        # OllamaRequest(
        #     model="phi3:mini",
        #     prompt="",
        #     system="You are a HIGH-PERFORMANCE JSON extraction engine. Return ONLY a single JSON object. The output structure must be defined by the input payload.",
        # )
    )
