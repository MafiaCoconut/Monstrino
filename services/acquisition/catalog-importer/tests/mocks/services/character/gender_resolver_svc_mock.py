import pytest
from monstrino_core.domain.services import NameFormatter
from more_itertools.more import side_effect
from pytest_mock import MockerFixture
from application.services.character.gender_resolver_svc import GenderResolverService

@pytest.fixture
def gender_resolver_svc_mock(mocker: MockerFixture):
    async def _resolver(parsed, character):
        character.gender = parsed.gender
        return None
    mock = mocker.Mock()
    mock.resolve = mocker.AsyncMock(side_effect=_resolver)
    return mock