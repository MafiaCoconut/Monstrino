from enum import StrEnum


class KIConnectModels(StrEnum):
    OPENAI_GPT5         = "openai-gpt5"
    OPENAI_GPT41        = "openai-gpt41"
    OPENAI_GPT41_MINI   = "openai-gpt41-mini"
    DEEPSEEK_R1         = "DEEPSEEK R1"
    LLAMA_3_1_8B        = "LLAMA 3.1 8B"
    QWEN_3_32B          = "QWEN 3-32B"
    OPENAI_GPT5_2       = "openai-gpt5.2"
    MISTRALAI_MISTRAL_SMALL_4_119B_2603 = "mistralai-mistral-small-4-119b-2603"


class KIConnectMessageRoles(StrEnum):
    SYSTEM = "system"
    USER="user"
    CHANNEL="assistant"
    TOOL="tool"

"""

{
    "id": "openai-gpt5",
    "object": "model",
    "created": 1776693655,
    "owned_by": "h-brs.de"
},
{
    "id": "openai-gpt41",
    "object": "model",
    "created": 1776693655,
    "owned_by": "h-brs.de"
},
{
    "id": "openai-gpt41-mini",
    "object": "model",
    "created": 1776693655,
    "owned_by": "h-brs.de"
},
{
    "id": "DEEPSEEK R1",
    "object": "model",
    "created": 1776693655,
    "owned_by": "h-brs.de"
},
{
    "id": "LLAMA 3.1 8B",
    "object": "model",
    "created": 1776693655,
    "owned_by": "h-brs.de"
},
{
    "id": "QWEN 3-32B",
    "object": "model",
    "created": 1776693655,
    "owned_by": "h-brs.de"
},
{
    "id": "openai-gpt5.2",
    "object": "model",
    "created": 1776693655,
    "owned_by": "h-brs.de"
},
{
    "id": "mistralai-mistral-small-4-119b-2603",
    "object": "model",
    "created": 1776693655,
    "owned_by": "h-brs.de"
}
]
}
"""