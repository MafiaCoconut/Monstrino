import pytest
from pytest_mock import MockerFixture


@pytest.fixture
def image_reference_svc_mock(mocker: MockerFixture):
    return mocker.AsyncMock()