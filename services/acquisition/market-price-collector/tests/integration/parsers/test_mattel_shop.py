import pytest

from infra.parsers.mattel_shopping import MattelShoppingParser
from infra.parsers.smyth import SmythParser


def get_url(country_code: str):

    match country_code:
        case "fr":
            return "https://shopping.mattel.com/fr-fr"
        case "el":
            return "https://shopping.mattel.com/el-gr"
        case "it":
            return "https://shopping.mattel.com/it-it"
        case "es":
            return "https://shopping.mattel.com/es-es"
        case "de":
            return "https://shopping.mattel.com/de-de"
        case "en":
            return "https://shopping.mattel.com/en-gb"
        case "nl":
            return "https://shopping.mattel.com/nl-nl"
        case "pl":
            return "https://shopping.mattel.com/pl-pl"
        case "tr":
            return "https://shopping.mattel.com/tr-tr"
        case "us":
            return "https://shop.mattel.com"
        case "ca":
            return "https://shop.mattel.com/en-ca"
        case "mx":
            return "https://shop.mattel.com/es-mx"
        case "br":
            return "https://shop.mattel.com/pt-br"
        case "au":
            return "https://shop.mattel.com.au"
        case _:
            raise ValueError(f"Unsupported country code: {country_code}")

def link_all_relesases():
    return get_url("en") + "/collections/monster-high"

def link_skelita():
    return get_url("en") + "/products/" + "monster-high-skelita-calaveras-fashion-doll-in-ruffled-dress-jhk34-en-gb.json"

# ORIGINAL
# https://shopping.mattel.com/en-gb/products/monster-high-skelita-calaveras-fashion-doll-in-ruffled-dress-jhk34-en-gb

# https://shopping.mattel.com/en-gb/products/monster-high-skelita-calaveras-fashion-doll-in-ruffled-dress-jhk34-en-gb
# https://shopping.mattel.com/en-gb/collections/monster-highmonster-high-skelita-calaveras-fashion-doll-in-ruffled-dress-jhk34-en-gb
# https://shopping.mattel.com/en-gb/products/monster-high-skelita-calaveras-fashion-doll-in-ruffled-dress-jhk34-en-gb
# def link_mh():
#         return "toys/fashion-and-dolls/monster-high/" + link_238403()
#
# def link_uk():
#     return "https://www.smythstoys.com/uk/en-gb/" + link_mh()

@pytest.mark.asyncio
# async def test_uk(uow_factory, seed_market_default_values):
async def test_uk():
    parser = MattelShoppingParser()
    await parser.parse()


# @pytest.mark.asyncio
# async def test_uk():
#     parser = MattelShoppingParser()
#     await parser.parse_page(link_skelita())
    # await parser.parse_by_external_id(country_code=country, language=language, external_id=link_238403())