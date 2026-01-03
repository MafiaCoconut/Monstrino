import os

import pytest
from icecream import ic
from monstrino_core.domain.value_objects import ReleaseTypePackType, ReleaseTypePackCountType
from monstrino_core.shared.enums import ProcessingStates
from monstrino_repositories.unit_of_work import UnitOfWorkFactory

from bootstrap.container_components.repositories import Repositories
from infrastructure.parsers import MHArchiveReleasesParser


# link="https://mhcollector.com/skulltimate-secrets-hauntlywood-clawdeen-wolf/"
# link = "https://mhcollector.com/deadfast-ghoulia-yelps-2024/" # from the box
# link = "https://mhcollector.com/draculaura-and-clawdeen-wolf-eeekend-getaway/"
# link = "https://mhcollector.com/day-out-3-pack/"
# link = "https://mhcollector.com/draculaura-bite-in-the-park/"  # 2 pets
# link = "https://mhcollector.com/dawn-of-the-dance-lagoona-blue-reissue/"
# link = "https://mhcollector.com/skulltimate-secrets-neon-frights-draculaura/"
# link = "https://mhcollector.com/vinyl-count-fabulous/"
# link = "https://mhcollector.com/original-ghouls-collection-6-pack/" # 6 characters and reissues
# link = "https://mhcollector.com/freaky-fusion-catacombs/"
# link = "https://mhcollector.com/freaky-fusion-save-frankie-jackson-jekyll/"
domain_link = os.getenv("MHARCHIVE_URL")

def link_default():
    return domain_link+"/generation-3-skelita-calaveras/"

def link_playset():
    return domain_link+"/draculaura-and-clawdeen-wolf-eeekend-getaway/"

def link_from_box():
    return domain_link+"/deadfast-ghoulia-yelps-2024/"

def link_multiple_pets():
    return domain_link+"/draculaura-bite-in-the-park/"

def link_multipack():
    return domain_link+"/original-ghouls-collection-6-pack/"

def link_exclusive():
    return domain_link+"/deadfast-ghoulia-yelps-2024/"

def link_reissue():
    return domain_link+"/dawn-of-the-dance-lagoona-blue-reissue/"

def link_budget():
    return domain_link+"/buried-secrets-scaremester-draculaura/"

def link_minis():
    return domain_link+"/fruit-ghouls-minis-venus-mcflytrap/"

def link_ornament():
    return domain_link+"/american-greetings-draculaura-ornament/"

def link_from_the_box():
    return domain_link+'/skullector-the-shining-grady-twins-re-release/'

@pytest.mark.asyncio
async def test_parse_release_single(
        uow_factory: UnitOfWorkFactory[Repositories],
):
    parser = MHArchiveReleasesParser()

    async for batch in parser.parse(batch_size=1, limit=1):
        ic(batch)

@pytest.mark.asyncio
async def test_parse_release_single_playset(
        uow_factory: UnitOfWorkFactory[Repositories],
):
    parser = MHArchiveReleasesParser()

    result = await parser.parse_by_external_id(external_id=link_playset())
    ic(result)
    assert result.name == "Draculaura and Clawdeen Wolf Eeekend Getaway"
    assert result.mpn == "HXH93"
    assert result.year_raw == "2024"
    assert result.year == 2024

    assert result.characters_raw == ["Clawdeen Wolf", "Draculaura"]
    assert result.gender_raw == ["Ghoul"]
    assert result.series_raw == ["Miscellaneous"]
    assert result.content_type_raw == ["Playsets"]
    assert result.pack_type_raw is None
    assert result.tier_type_raw is None
    assert result.exclusive_vendor_raw is None
    assert result.pet_names_raw is None
    assert result.reissue_of_raw is None

    assert result.primary_image != ""
    assert result.images != []
    assert result.images_link != ""

    assert result.description_raw != ""
    assert result.from_the_box_text_raw is None

    assert result.content_hash is None
    assert result.processing_state == ProcessingStates.INIT

@pytest.mark.asyncio
async def test_parse_release_single_default(
        uow_factory: UnitOfWorkFactory[Repositories],
):
    parser = MHArchiveReleasesParser()

    result = await parser.parse_by_external_id(external_id=link_default())
    ic(result)
    assert result.name == "Generation 3 Skelita Calaveras"
    assert result.mpn == "JHK34"
    assert result.year_raw == "2025"
    assert result.year == 2025

    assert result.characters_raw == ["Skelita Calaveras"]
    assert result.gender_raw == ["Ghoul"]
    assert result.series_raw == ["Generation 3"]
    assert result.content_type_raw is None
    assert result.pack_type_raw is None
    assert result.tier_type_raw is None
    assert result.exclusive_vendor_raw is None
    assert result.pet_names_raw == ["Candelita"]
    assert result.reissue_of_raw is None

    assert result.primary_image != ""
    assert result.images != []
    assert result.images_link != ""

    assert result.description_raw != ""
    assert result.from_the_box_text_raw is None

    assert result.content_hash is None
    assert result.processing_state == ProcessingStates.INIT

@pytest.mark.asyncio
async def test_parse_release_multiple_pets(
        uow_factory: UnitOfWorkFactory[Repositories],
):
    parser = MHArchiveReleasesParser()

    result = await parser.parse_by_external_id(external_id=link_multiple_pets())
    ic(result)
    assert result.name == "Draculaura Bite in the Park"
    assert result.mpn == "HNF90"
    assert result.year_raw == "2023"
    assert result.year == 2023

    assert result.characters_raw == ["Draculaura"]
    assert result.gender_raw == ["Ghoul"]
    assert result.series_raw == ["Miscellaneous"]
    assert result.content_type_raw == ["Playsets"]
    assert result.pack_type_raw is None
    assert result.tier_type_raw is None
    assert result.exclusive_vendor_raw is None
    assert result.pet_names_raw == ["Count Fabulous", "Rockseena"]
    assert result.reissue_of_raw is None

    assert result.primary_image != ""
    assert result.images != []
    assert result.images_link != ""

    assert result.description_raw != ""
    assert result.from_the_box_text_raw != ""

    assert result.content_hash is None
    assert result.processing_state == ProcessingStates.INIT

@pytest.mark.asyncio
async def test_parse_release_multipack(
        uow_factory: UnitOfWorkFactory[Repositories],
):
    parser = MHArchiveReleasesParser()

    result = await parser.parse_by_external_id(external_id=link_multipack())
    ic(result)
    assert result.name == "Original Ghouls Collection 6-Pack"
    assert result.mpn is None
    assert result.year_raw == "2015"
    assert result.year == 2015

    assert result.characters_raw == ["Clawdeen Wolf", "Cleo de Nile", "Draculaura", "Frankie Stein", "Ghoulia Yelps", "Lagoona Blue"]
    assert result.gender_raw == ["Ghoul"]
    assert result.series_raw == ["Original Ghouls Collection"]
    assert result.content_type_raw is None
    assert result.pack_type_raw == ["6-Pack"]
    assert result.tier_type_raw is None
    assert result.exclusive_vendor_raw is None
    assert result.pet_names_raw is None
    assert result.reissue_of_raw == ["Wave 1 Clawdeen Wolf", "Wave 1 Cleo de Nile & Deuce Gorgon 2-Pack", "Wave 1 Draculaura", "Wave 1 Frankie Stein", "Wave 1 Ghoulia Yelps", "Wave 1 Lagoona Blue"]

    assert result.primary_image != ""
    assert result.images != []
    assert result.images_link != ""

    assert result.description_raw != ""
    assert result.from_the_box_text_raw is None

    assert result.content_hash is None
    assert result.processing_state == ProcessingStates.INIT

@pytest.mark.asyncio
async def test_parse_release_exclusive(
        uow_factory: UnitOfWorkFactory[Repositories],
):
    parser = MHArchiveReleasesParser()

    result = await parser.parse_by_external_id(external_id=link_exclusive())
    ic(result)
    assert result.name == "Deadfast Ghoulia Yelps (2024)"
    assert result.mpn == "HRP95"
    assert result.year_raw == "2024"
    assert result.year == 2024

    assert result.characters_raw == ["Ghoulia Yelps"]
    assert result.gender_raw == ["Ghoul"]
    assert result.series_raw == ["Miscellaneous"]
    assert result.content_type_raw is None
    assert result.pack_type_raw is None
    assert result.tier_type_raw is None
    assert result.exclusive_vendor_raw == ["Mattel Creations", "San Diego Comic-Con"]
    assert result.pet_names_raw is None
    assert result.reissue_of_raw is None

    assert result.primary_image != ""
    assert result.images != []
    assert result.images_link != ""

    assert result.description_raw != ""
    assert result.from_the_box_text_raw != ""

    assert result.content_hash is None
    assert result.processing_state == ProcessingStates.INIT

@pytest.mark.asyncio
async def test_parse_release_budget(
        uow_factory: UnitOfWorkFactory[Repositories],
):
    parser = MHArchiveReleasesParser()

    result = await parser.parse_by_external_id(external_id=link_budget())
    ic(result)
    assert result.name == "Buried Secrets Scaremester Draculaura"
    assert result.mpn is None
    assert result.year_raw == "2025"
    assert result.year == 2025

    assert result.characters_raw == ["Draculaura"]
    assert result.gender_raw == ["Ghoul"]
    assert result.series_raw == ["Buried Secrets"]
    assert result.content_type_raw is None
    assert result.pack_type_raw is None
    assert result.tier_type_raw == "Budget"
    assert result.exclusive_vendor_raw is None
    assert result.pet_names_raw is None
    assert result.reissue_of_raw is None

    assert result.primary_image != ""
    assert result.images != []
    assert result.images_link != ""

    assert result.description_raw != ""
    assert result.from_the_box_text_raw is None

    assert result.content_hash is None
    assert result.processing_state == ProcessingStates.INIT

@pytest.mark.asyncio
async def test_parse_release_from_the_box(
        uow_factory: UnitOfWorkFactory[Repositories],
):
    parser = MHArchiveReleasesParser()

    result = await parser.parse_by_external_id(external_id=link_from_the_box())

    assert result.name == "Skullector The Shining Grady Twins (Re-Release)"
    assert result.mpn == "GNP21"
    assert result.year_raw == "2025"
    assert result.year == 2025

    assert result.characters_raw == ["Grady Twins"]
    assert result.gender_raw == ["Ghoul"]
    assert result.series_raw == ["Skullector"]
    assert result.content_type_raw is None
    assert result.pack_type_raw == ["2-Pack"]
    assert result.tier_type_raw is None
    assert result.exclusive_vendor_raw == ["Mattel Creations"]
    assert result.pet_names_raw is None
    assert result.reissue_of_raw is None

    assert result.primary_image != ""
    assert result.images != []
    assert result.images_link != ""

    assert result.description_raw.strip("Originally sold out in 2020")
    assert "Come play with us, ghoul" not in result.description_raw
    assert result.from_the_box_text_raw.startswith("Come play with us, ghoul")

    assert result.content_hash is None
    assert result.processing_state == ProcessingStates.INIT

@pytest.mark.asyncio
async def test_parse_release_minis(
        uow_factory: UnitOfWorkFactory[Repositories],
):
    parser = MHArchiveReleasesParser()

    result = await parser.parse_by_external_id(external_id=link_minis())
    assert result is None

@pytest.mark.asyncio
async def test_parse_release_ornament(
        uow_factory: UnitOfWorkFactory[Repositories],
):
    parser = MHArchiveReleasesParser()

    result = await parser.parse_by_external_id(external_id=link_ornament())
    assert result is None


# ====================== HELP MENU ========================
# ---- Default assertions ----

# assert result.name == "Generation 3 Skelita Calaveras"
# assert result.mpn == "JHK34"
# assert result.year_raw == "2025"
# assert result.year == 2025
#
# assert result.characters_raw == ["Clawdeen Wolf", "Draculaura"]
# assert result.gender_raw == ["Ghoul"]
# assert result.series_raw == ["Miscellaneous"]
# assert result.content_type_raw == ["Playsets"]
# assert result.pack_type_raw == []
# assert result.tier_type_raw == ""
# assert result.exclusive_vendor_raw == []
# assert result.pet_names_raw == []
# assert result.reissue_of_raw == []
#
# assert result.primary_image != ""
# assert result.images != []
# assert result.images_link != ""
#
# assert result.description_raw != ""
# assert result.from_the_box_text_raw is None
#
# assert result.content_hash == ""
# assert result.processing_state == ProcessingStates.INIT
