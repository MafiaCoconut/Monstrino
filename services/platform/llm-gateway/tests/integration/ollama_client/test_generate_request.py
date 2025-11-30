from datetime import datetime
from icecream import ic
import pytest
from application.interfaces.ollama_client_interface import OllamaClientInterface
from domain.enum import OllamaModels
from domain.vault_obj import OllamaRequest


def small_prompt():
    return "The set includes Draculaura, Clawdeen Wolf and a pet owl"

def middle_prompt():
    return """
    The Comet-Crossed Couple 2-pack features Cleo de Nile and Deuce Gorgon.
Cleo de Nile
Cleo has long black hair with streaks of blue and glittery gold. It is held to the back with a gold and blue headband of Isis, the Egyptian goddess. Her makeup features dark red lipstick, blue and yellow eyeshadow, and one eye decorated to look like the Eye of Horus.
She is wearing a beautiful form-fitting dress with a blue, turquoise, and lavender mummy bandage print. The upper chest and sleeves are black fishnet and the entire dress is adorned with shimmery gold bandages. She accessorizes with gold bandage earrings, gold draping wrist wraps, and copper and blue sandals. The sandals have a Sphinx-like appearance with snakes winding up her legs.
Deuce Gorgon
Deuce has scaly green hair with his snake-hawk hanging to one side. He is wearing a green & chartreuse scale print sweater with green trim, green cuffs, and a black snake design around the collar. His pants are black leatherette with a snakeskin pattern. Accessories consist of gold crystal sunglasses, a copper hoop earring, and copper high tops with side cutouts and crystal accents.
Included with the 2-pack are two doll stands, a brush, and diaries for Cleo and Deuce.
    """

def big_prompt():
    return """
    This 3-pack features the ghouls of Boo York wearing their daytime fashion.

Luna Mothews
Luna has lovely black hair with streaks of red that is pulled into pigtails. She has yellow segmented skin, black antennae, red eyes with hexagonal pupils, gray eyeshadow, and black lipstick. On her back are translucent cerise wings with black vein accents.

She is wearing a strapless dress with a black bodice adorned with two shimmery silver strips. The skirt is decorated with a black & yellow cityscape below a red sky with yellow stars and moons. She accessorizes with red moth glasses and black booties with cocoon heels.

Mouscedes King
Mouscedes has wavy pink hair with her mouse ears poking through. She has turquoise eyeshadow, pink lipstick, gray skin, and a mouse tail.

She is wearing a cute sleeveless dress with a yellow polka dot bodice. The shimmery turquoise skirt has a black waist, accordion pleats, and diagonal lines formed by black triangle outlines. Accessories consist of a turquoise headband with bow and pink lace-up pumps with bow accents.

Elle Eedee
Elle has black hair with blue and purple streaks that is twisted into a high ponytail. She has gray robotic skin, lavender eyebrows and lipstick, and turquoise eyeshadow.

She is wearing a futuristic dress with colorful blurred dots and a white circuit board print. Over the dress is a cropped purple jacket with pink & white stitching. Accessories include a blue multi-screw choker and amazing purple knee high boots with robotic designs and platforms held by blue tubes.

Stands or brushes are not included with the dolls.

    """

def small_system_prompt():
    return "You are a HIGH-PERFORMANCE JSON extraction engine. Return ONLY a single JSON object. The output structure must be defined by the input payload."

def normal_system_prompt():
    return """
You are a Monster High JSON data extraction engine.
Goal: Read INPUT JSON, extract specified fields from `payload.description`, and return OUTPUT JSON.
**MUST** output ONLY a single, valid JSON object. **NEVER** output natural language, explanations, or chain-of-thought.

**INPUT STRUCTURE (Always):**
<text>

**OUTPUT STRUCTURE (Always):**
{
  "success": true,
  "characters": [...],
  "pets": [...],
  "playset_items": [...],
  "accessories": [...],
  "series": [...],
  "pack_type": null or "<string>",
  "tier_type": null or "<string>",
  "items": [...],
  "exclusives_vendords": [...],
  "year": null or <integer>,
  "mpn": null or "<string>"
}

**STRICT FAILURE/ERROR RULE:**
If input is invalid JSON or missing required keys, output:
{"success": false, "error": "INVALID_INPUT"}
    """

@pytest.mark.asyncio
async def test_generate_small_request_small_system_prompt(ollama_client: OllamaClientInterface):
    start_time = datetime.now()
    await ollama_client.generate(
        OllamaRequest(
            model=OllamaModels.PHI3_MINI,
            prompt=small_prompt(),
            system=small_system_prompt(),
        )
    )
    ic(datetime.now()-start_time )

@pytest.mark.asyncio
async def test_generate_small_request_system_prompt(ollama_client: OllamaClientInterface):
    start_time = datetime.now()
    await ollama_client.generate(
        OllamaRequest(
            # model=OllamaModels.PHI3_MINI,
            model=OllamaModels.MISTRAL,
            prompt=small_prompt(),
            system=normal_system_prompt(),
        )
    )
    ic(datetime.now()-start_time )

@pytest.mark.asyncio
async def test_generate_middle_request_system_prompt(ollama_client: OllamaClientInterface):
    start_time = datetime.now()
    await ollama_client.generate(
        OllamaRequest(
            model=OllamaModels.PHI3_MINI,
            prompt=middle_prompt(),
            system=normal_system_prompt(),
        )
    )
    ic(datetime.now()-start_time )


@pytest.mark.asyncio
async def test_generate_big_request_system_prompt(ollama_client: OllamaClientInterface):
    start_time = datetime.now()
    await ollama_client.generate(
        OllamaRequest(
            model=OllamaModels.MISTRAL,
            prompt=big_prompt(),
            system=normal_system_prompt(),
        )
    )
    ic(datetime.now()-start_time )







@pytest.mark.asyncio
async def test_generate_custom_request_without_system_prompt(ollama_client: OllamaClientInterface):
    start_time = datetime.now()
    await ollama_client.generate(
        OllamaRequest(
            model=OllamaModels.PHI3_MINI,
            # model=OllamaModels.QWEN3_14B,
            prompt="If i send you information about a monster high doll release, which information you could parse from there and give me?",
            system="",
        )
    )
    ic(datetime.now()-start_time )
