import pytest
from monstrino_models.dto import ParsedSource
from monstrino_models.orm import ParsedSourcesORM


@pytest.fixture
def parsed_source() -> ParsedSource:
    return ParsedSource(
        name="Fandom",
        service_type="html",
        base_url="https://monsterhigh.fandom.com/",
        description="Primary Fandom wiki used for parsing Monster High doll data.",
        is_enabled=True,
    )


@pytest.fixture
def parsed_sources() -> list[ParsedSource]:
    return [
        ParsedSource(
            name="Fandom",
            service_type="html",
            base_url="https://monsterhigh.fandom.com/",
            description="Primary Fandom wiki used for parsing Monster High content.",
            is_enabled=True,
        ),
        ParsedSource(
            name="Mattel Creations API",
            service_type="api",
            base_url="https://creations.mattel.com/api/",
            description="Official Mattel Creations API for exclusive doll releases.",
            is_enabled=True,
        ),
        ParsedSource(
            name="RSS Feed Collector",
            service_type="rss",
            base_url="https://monsterhighnews.example.com/rss",
            description="RSS-based news collector for Monster High announcements.",
            is_enabled=False,
        ),
    ]


@pytest.fixture
def parsed_sources_orms() -> list[ParsedSourcesORM]:
    return [
        ParsedSourcesORM(
            name="Fandom",
            service_type="html",
            base_url="https://monsterhigh.fandom.com/",
            description="Primary Fandom wiki used for parsing Monster High content.",
            is_enabled=True,
        ),
        ParsedSourcesORM(
            name="Mattel Creations API",
            service_type="api",
            base_url="https://creations.mattel.com/api/",
            description="Official Mattel Creations API for exclusive doll releases.",
            is_enabled=True,
        ),
        ParsedSourcesORM(
            name="RSS Feed Collector",
            service_type="rss",
            base_url="https://monsterhighnews.example.com/rss",
            description="RSS-based news collector for Monster High announcements.",
            is_enabled=False,
        ),
    ]


@pytest.fixture
async def seed_parsed_sources_db(engine, session_factory, parsed_sources_orms):
    """Асинхронное наполнение таблицы parsed_sources начальными данными для тестов."""
    async with session_factory() as session:
        session.add_all(parsed_sources_orms)
        await session.commit()
    yield
