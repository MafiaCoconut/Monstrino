import os

import pytest
from icecream import ic
from monstrino_core.shared.enums import ProcessingStates
from monstrino_repositories.unit_of_work import UnitOfWorkFactory

from app.container_components.repositories import Repositories
from infrastructure.parsers import MHArchivePetsParser

domain_link = os.getenv("MHARCHIVE_LINK")

def link_azura():
    return domain_link+"/category/characters/pets/azura/"

def link_count_fabulous():
    return domain_link+"/category/characters/pets/count-fabulous/"

def link_no_desc():
    return domain_link+"/category/characters/pets/candelita/"

@pytest.mark.asyncio
async def test_parse_pet_single_azura():
    parser = MHArchivePetsParser()

    result = await parser.parse_link(link_azura())

    assert result.name == "Azura"
    assert result.description.startswith("Azura is a scarab beetle that is gold")
    assert result.owner_name == "Nefera de Nile"
    assert result.link == link_azura()
    assert result.processing_state == ProcessingStates.INIT
    assert result.external_id == "azura"

@pytest.mark.asyncio
async def test_parse_pet_single_count_fabulous():
    parser = MHArchivePetsParser()

    result = await parser.parse_link(link_count_fabulous())

    assert result.name == "Count Fabulous"
    assert result.description.startswith("Count Fabulous is a bat and the pet of")
    assert result.owner_name == "Draculaura"
    assert result.link == link_count_fabulous()
    assert result.processing_state == ProcessingStates.INIT
    assert result.external_id == "count-fabulous"

@pytest.mark.asyncio
async def test_parse_pet_single_no_desc():
    parser = MHArchivePetsParser()

    result = await parser.parse_link(link_no_desc())

    assert result.name == "Candelita"
    assert result.description is None
    assert result.owner_name == "Skelita Calaveras"
    assert result.link == link_no_desc()
    assert result.processing_state == ProcessingStates.INIT
    assert result.external_id == "candelita"