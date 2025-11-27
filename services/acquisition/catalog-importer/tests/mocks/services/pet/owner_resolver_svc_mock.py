import pytest
from pytest_mock import MockerFixture


@pytest.fixture
def owner_resolver_svc_mock(mocker: MockerFixture):
    return mocker.AsyncMock()