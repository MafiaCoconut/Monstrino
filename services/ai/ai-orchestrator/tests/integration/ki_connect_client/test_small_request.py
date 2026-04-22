import os

import pytest
from icecream import ic
from dotenv import load_dotenv
from domain.enum import KIConnectModels, KIConnectMessageRoles
from domain.vault_obj.requests import KIConnectClientRequest
from domain.vault_obj.requests.ki_connect import ChatMessageData
from infra.llm_clients.ki_connect_client import KIConnectClient

load_dotenv()
API_KEY = os.getenv("KI_CONNECT_API_KEY")


def get_client():
    return KIConnectClient(API_KEY)

@pytest.mark.asyncio
async def test_small_request():
    client = get_client()

    request = KIConnectClientRequest(
        model=KIConnectModels.QWEN_3_32B,
        messages=[
            ChatMessageData(
                role=KIConnectMessageRoles.SYSTEM,
                content="Return only json"
            ),
            ChatMessageData(
                role=KIConnectMessageRoles.USER,
                content="How many monster high dolls where released in 2025?"
            ),
        ],
        temperature=0.2
    )
    result = await client.generate(request)
    ic(result)