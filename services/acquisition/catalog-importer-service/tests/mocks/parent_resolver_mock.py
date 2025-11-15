import pytest

@pytest.fixture
def parent_resolver_mock(mocker):
    return mocker.AsyncMock()