import pytest

from infra.parsers.smyth import SmythParser

def link_238403():
    return "monster-high-scary-sweet-birthday-draculaura-doll/p/248403"

def link_mh():
        return "toys/fashion-and-dolls/monster-high/" + link_238403()

def link_uk():
    return "https://www.smythstoys.com/uk/en-gb/" + link_mh()


@pytest.mark.asyncio
async def test_uk():
    parser = SmythParser()
    country = "uk"
    language = "gb"
    await parser.parse_by_external_id(country_code=country, language=language, external_id=link_238403())