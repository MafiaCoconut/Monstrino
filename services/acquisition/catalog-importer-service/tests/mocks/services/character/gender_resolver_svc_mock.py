import pytest
from monstrino_core import NameFormatter
from more_itertools.more import side_effect
from pytest_mock import MockerFixture
from application.services.character.gender_resolver_svc import GenderResolverService

@pytest.fixture
def gender_resolver_svc_mock(mocker: MockerFixture):
    async def _resolver(uow, parsed, character):
        gender_id = await uow.repos.character_gender.get_id_by(name=NameFormatter.format_name(parsed.gender))
        character.gender_id = gender_id  # ОБЯЗАТЕЛЬНО, иначе упадёт NOT NULL
        return None
    mock = mocker.Mock()
    mock.resolve = mocker.AsyncMock(side_effect=_resolver)
    return mock