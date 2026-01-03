import os

import pytest
from icecream import ic
from monstrino_core.domain.value_objects import CharacterGender
from monstrino_core.shared.enums import ProcessingStates
from monstrino_repositories.unit_of_work import UnitOfWorkFactory

from bootstrap.container_components.repositories import Repositories
from infra.parsers import MHArchiveCharacterParser

domain_link = os.getenv("MHARCHIVE_URL")

def link_abbey():
    return domain_link+"/category/characters/ghouls/abbey-bominable/"

def link_no_description():
    return domain_link+"/category/characters/ghouls/alien/"


@pytest.mark.asyncio
async def test_parse_character_single_abbey():
    parser = MHArchiveCharacterParser()

    result = await parser.parse_by_external_id(link_abbey())

    assert result.name == "Abbey Bominable"
    assert result.description.startswith("Abbey is the tough and stubborn blue-skinned daughter of the yeti known")
    assert result.gender == CharacterGender.GHOUL
    assert result.link == link_abbey()
    assert result.external_id == "abbey-bominable"
    assert result.processing_state == ProcessingStates.INIT

@pytest.mark.asyncio
async def test_parse_character_single_no_description():
    parser = MHArchiveCharacterParser()

    result = await parser.parse_by_external_id(link_no_description())

    assert result.name == "Alien"
    assert result.description is None
    assert result.gender == CharacterGender.GHOUL
    assert result.link == link_no_description()
    assert result.external_id == "alien"
    assert result.processing_state == ProcessingStates.INIT


