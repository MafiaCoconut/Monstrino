import pytest
from monstrino_models.dto import ParsedSourceType
from monstrino_models.orm import ParsedSourceTypesORM


@pytest.fixture
def parsed_source_type() -> ParsedSourceType:
    return ParsedSourceType(
        name="HTML",
        description="Standard HTML web pages parsed via BeautifulSoup.",
        requires_auth=False,
        is_active=True,
    )


@pytest.fixture
def parsed_source_types() -> list[ParsedSourceType]:
    return [
        ParsedSourceType(
            name="HTML",
            description="Standard HTML web pages parsed via BeautifulSoup.",
            requires_auth=False,
            is_active=True,
        ),
        ParsedSourceType(
            name="API",
            description="REST or GraphQL API endpoints providing structured JSON data.",
            requires_auth=True,
            is_active=True,
        ),
        ParsedSourceType(
            name="RSS",
            description="XML-based RSS feeds for incremental content updates.",
            requires_auth=False,
            is_active=False,
        ),
    ]


@pytest.fixture
def parsed_source_types_orms() -> list[ParsedSourceTypesORM]:
    return [
        ParsedSourceTypesORM(
            name="HTML",
            description="Standard HTML web pages parsed via BeautifulSoup.",
            requires_auth=False,
            is_active=True,
        ),
        ParsedSourceTypesORM(
            name="API",
            description="REST or GraphQL API endpoints providing structured JSON data.",
            requires_auth=True,
            is_active=True,
        ),
        ParsedSourceTypesORM(
            name="RSS",
            description="XML-based RSS feeds for incremental content updates.",
            requires_auth=False,
            is_active=False,
        ),
    ]


@pytest.fixture
async def seed_parsed_source_types_db(engine, session_factory, parsed_source_types_orms):
    """Асинхронное наполнение таблицы parsed_source_types начальными данными для тестов."""
    async with session_factory() as session:
        session.add_all(parsed_source_types_orms)
        await session.commit()
    yield
