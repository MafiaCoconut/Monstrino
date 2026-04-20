from datetime import datetime
from icecream import ic
import pytest
from app.interfaces.ollama_client_interface import OllamaClientInterface
from app.use_cases.catalog import GetCharacterSeriesFromReleaseTitle, ProcessReleaseTitleUseCase
from domain.enum import OllamaModels
from domain.vault_obj.requests import OllamaClientRequest
from infra.api_clients import CatalogApiClient


def get_uc(ollama_client):
    return GetCharacterSeriesFromReleaseTitle(
        llm_model=ollama_client
    )
    # return ProcessReleaseTitleUseCase(
    #     llm_model=ollama_client,
    #     catalog_api_client=CatalogApiClient()
    # )


def title_1():
    return "Monster High Doll, Frankie Stein, Skulltimate Secrets: Neon Frights"

def title_2():
    return "Monster High Doll, Draculaura, Skulltimate Secrets: Neon Frights"

def title_3():
    return "Monster High Doll And Sleepover Accessories, Twyla, Creepover Party"

def title_4():
    return "Monster High Cleo De Nile Fashion Doll With Pet Hissette And Accessories"

def title_5():
    return "Monster High Skulltimate Secrets Monster Mysteries Playset, Abbey Bominable Doll With 19+ Surprises"

def title_6():
    return "Monster High Wednesday Collectible Doll, Rave’N Wednesday in Black Gown Inspired By Dance Scene"

def title_7():
    return "Monster High Wednesday Collectible Doll, Wednesday Addams in Nevermore Academy Uniform With Thing "

def title_8():
    return "Monster High Skullector Sweet Screams Twyla Doll"

@pytest.mark.asyncio
async def test_title_1(ollama_client):
    uc = get_uc(ollama_client)
    start_time = datetime.now()
    result = await uc.execute(title_1())
    ic(datetime.now()-start_time )
    assert result.characters == ["Frankie Stein"]
    assert result.series[0].title == "Skulltimate Secrets"
    assert result.series[0].subseries_title == "Neon Frights"
    

@pytest.mark.asyncio
async def test_title_2(ollama_client):
    uc = get_uc(ollama_client)
    start_time = datetime.now()
    result = await uc.execute(title_2())
    ic(datetime.now() - start_time)
    assert result.characters == ["Draculaura"]
    assert result.series[0].title == "Skulltimate Secrets"
    assert result.series[0].subseries_title == "Neon Frights"

    # ic(result)
    
@pytest.mark.asyncio
async def test_title_3(ollama_client):
    uc = get_uc(ollama_client)
    start_time = datetime.now()
    result = await uc.execute(title_3())
    ic(datetime.now() - start_time)
    assert result.characters == ["Twyla"]
    assert result.series[0].title == "Creepover Party"
    assert result.series[0].subseries_title is None

    # ic(result)


@pytest.mark.asyncio
async def test_title_4(ollama_client):
    uc = get_uc(ollama_client)
    start_time = datetime.now()
    result = await uc.execute(title_4())
    ic(datetime.now() - start_time)
    assert result.characters == ["Cleo De Nile"]
    assert result.series == []
    # ic(result)

@pytest.mark.asyncio
async def test_title_5(ollama_client):
    uc = get_uc(ollama_client)
    start_time = datetime.now()
    result = await uc.execute(title_5())
    ic(datetime.now() - start_time)
    assert result.characters == ["Abbey Bominable"]
    assert result.series[0].title == "Skulltimate Secrets"
    assert result.series[0].subseries_title == "Monster Mysteries"
    # ic(result)

@pytest.mark.asyncio
async def test_title_6(ollama_client):
    uc = get_uc(ollama_client)
    start_time = datetime.now()
    result = await uc.execute(title_6())
    ic(datetime.now() - start_time)
    assert result.characters == ["Wednesday"]
    assert result.series[0].title == "Wednesday"
    assert result.series[0].subseries_title is None
    # ic(result)


@pytest.mark.asyncio
async def test_title_7(ollama_client):
    uc = get_uc(ollama_client)
    start_time = datetime.now()
    result = await uc.execute(title_7())
    ic(datetime.now() - start_time)
    assert result.characters == ["Wednesday"]
    assert result.series[0].title == "Wednesday"
    assert result.series[0].subseries_title is None


@pytest.mark.asyncio
async def test_title_8(ollama_client):
    uc = get_uc(ollama_client)
    start_time = datetime.now()
    result = await uc.execute(title_8())
    ic(datetime.now() - start_time)
    assert result.characters == ["Twyla"]
    assert result.series[0].title == "Skullector"
    assert result.series[0].subseries_title == "Sweet Screams"
    
