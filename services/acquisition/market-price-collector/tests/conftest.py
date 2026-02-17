import asyncio
import json
import logging.config
from pathlib import Path

import pytest


@pytest.fixture(scope="session")
def event_loop():
    loop = asyncio.new_event_loop()
    yield loop
    loop.close()


pytest_plugins = [
    "monstrino_testing.fixtures",
    "tests.fixtures",
]
