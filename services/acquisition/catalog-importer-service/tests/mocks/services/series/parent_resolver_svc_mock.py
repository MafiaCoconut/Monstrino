import pytest

@pytest.fixture
def parent_resolver_svc_mock(mocker):
    return mocker.AsyncMock()