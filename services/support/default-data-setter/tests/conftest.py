import asyncio
import json
import logging.config
from pathlib import Path
from dotenv import load_dotenv
import pytest


@pytest.fixture(scope="session")
def event_loop():
    loop = asyncio.new_event_loop()
    load_dotenv()
    yield loop
    loop.close()


pytest_plugins = [
    # "monstrino_testing.fixtures",
    "tests.fixtures",
]

# def pytest_configure():
#     cfg_path = Path(__file__).resolve().parent.parent / "src/infrastructure/logging/logging_config.json"  # поправь путь при необходимости
#
#     with cfg_path.open("r", encoding="utf-8") as f:
#         logging_config = json.load(f)
#
#     # важно: создать папку logs, иначе FileHandler упадёт
#     Path("../logs").mkdir(parents=True, exist_ok=True)
#
#     logging.config.dictConfig(logging_config)