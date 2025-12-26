import pytest
from icecream import ic
from monstrino_core.domain.value_objects import CharacterGender
from monstrino_core.shared.enums import ProcessingStates
from monstrino_repositories.unit_of_work import UnitOfWorkFactory

from app.container_components.repositories import Repositories
from infrastructure.parsers import MHArchiveCharacterParser


@pytest.mark.asyncio
async def test_parse_character_single(
        uow_factory: UnitOfWorkFactory[Repositories],
):
    parser = MHArchiveCharacterParser()

    batch_size=2
    limit = 5
    async for batch in parser.parse_ghouls(batch_size=batch_size, limit=limit):
        ic(batch)
        assert(len(batch) == batch_size or len(batch) == limit % batch_size)
        for character in batch:
            assert character.name is not None
            assert character.name != ""
            assert character.gender == CharacterGender.GHOUL or character.gender == CharacterGender.MANSTER
            # assert character.description is not None
            # assert character.description != ""
            assert character.link is not None
            assert character.processing_state == ProcessingStates.INIT
            assert character.source != ""
