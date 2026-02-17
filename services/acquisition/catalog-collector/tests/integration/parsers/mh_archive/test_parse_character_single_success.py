import os

import pytest
from icecream import ic
from monstrino_core.domain.value_objects import CharacterGender
from monstrino_core.shared.enums import ProcessingStates
from monstrino_infra.debug import ic_model

from infra.parsers import MHArchiveCharacterParser

domain_link = os.getenv("MHARCHIVE_URL")

def link_abbey():
    return "abbey-bominable"

def link_no_description():
    return "alien"


@pytest.mark.asyncio
async def test_parse_character_single_abbey():
    parser = MHArchiveCharacterParser()

    result = await parser.parse_by_external_id(link_abbey(), CharacterGender.GHOUL)
    ic_model(result)
    assert result.title == "Abbey Bominable"
    assert result.description.startswith("Abbey is the tough and stubborn blue-skinned daughter of the yeti known")
    assert result.gender == CharacterGender.GHOUL
    assert result.url.endswith(link_abbey()+'/')
    assert result.external_id == "abbey-bominable"
    assert result.processing_state == ProcessingStates.INIT

@pytest.mark.asyncio
async def test_parse_character_single_no_description():
    parser = MHArchiveCharacterParser()

    result = await parser.parse_by_external_id(link_no_description(), CharacterGender.GHOUL)
    ic_model(result)

    assert result.title == "Alien"
    assert result.description is None
    assert result.gender == CharacterGender.GHOUL
    assert result.url.endswith(link_no_description()+'/')
    assert result.external_id == "alien"
    assert result.processing_state == ProcessingStates.INIT


