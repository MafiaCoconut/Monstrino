import pytest
from monstrino_models.dto import ParsedCharacter


@pytest.fixture
def parsed_character():
    return ParsedCharacter(
        name="Ghoulia Yelps",
        gender="ghoul",
        description="Ghoulia is a timid and shy zombie who is the smartest student at Monster High. She likes to write, draw, and read comic books. Cleo de Nile is a close friend andSir Hoots A Lot, a baby blue owl, is her pet.",
        primary_image="https://mh-archive.com/wp-content/uploads/2016/03/Geek-Shriek-Ghoulia-Yelps-148x300.jpg",
        link="https://mh-archive.com/category/characters/ghouls/ghoulia-yelps/",
        processing_state="init",
        source="mh-archive"
    )
