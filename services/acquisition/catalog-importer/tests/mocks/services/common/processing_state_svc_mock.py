import pytest

@pytest.fixture
def processing_states_svc_mock(mocker: MockerFixture):
    return mocker.AsyncMock()