import pytest
from monstrino_models.dto import ReleaseSeriesLink
from monstrino_models.orm import ReleaseSeriesLinkORM, ReleasesORM, SeriesORM


# ========== Dependencies ==========

@pytest.fixture
def releases_orms() -> list[ReleasesORM]:
    return [
        ReleasesORM(
            name="Draculaura Ghouls Rule",
            display_name="Draculaura - Ghouls Rule",
            year=2012,
            description="Halloween edition of Draculaura.",
        ),
        ReleasesORM(
            name="Frankie Stein Sweet 1600",
            display_name="Frankie Stein - Sweet 1600",
            year=2012,
            description="Frankie Stein’s Sweet 1600 birthday edition.",
        ),
    ]


@pytest.fixture
def series_orms() -> list[SeriesORM]:
    return [
        SeriesORM(
            name="Ghouls Rule",
            display_name="Ghouls Rule",
            description="Special Halloween-themed Monster High series.",
            series_type="dolls",
        ),
        SeriesORM(
            name="Sweet 1600",
            display_name="Sweet 1600",
            description="Birthday celebration line featuring classic characters.",
            series_type="dolls",
        ),
    ]


@pytest.fixture
async def seed_release_series_dependencies_db(
    engine,
    session_factory,
    seed_releases_db,
    seed_series_db,
):
    """Асинхронное наполнение зависимых таблиц releases и series начальными данными для тестов."""
    yield


# ========== Main Fixtures ==========

@pytest.fixture
def release_series_link() -> ReleaseSeriesLink:
    return ReleaseSeriesLink(
        release_id=1,
        series_id=1,
        relation_type="primary",
    )


@pytest.fixture
def release_series_links() -> list[ReleaseSeriesLink]:
    return [
        ReleaseSeriesLink(
            release_id=1,
            series_id=1,
            relation_type="primary",
        ),
        ReleaseSeriesLink(
            release_id=2,
            series_id=2,
            relation_type="subseries",
        ),
    ]


@pytest.fixture
def release_series_links_orms() -> list[ReleaseSeriesLinkORM]:
    return [
        ReleaseSeriesLinkORM(
            release_id=1,
            series_id=1,
            relation_type="primary",
        ),
        ReleaseSeriesLinkORM(
            release_id=2,
            series_id=2,
            relation_type="subseries",
        ),
    ]


@pytest.fixture
async def seed_release_series_link_db(
    engine,
    session_factory,
    release_series_links_orms,
    seed_release_series_dependencies_db,
):
    """Асинхронное наполнение таблицы release_series_link начальными данными для тестов."""
    async with session_factory() as session:
        session.add_all(release_series_links_orms)
        await session.commit()
    yield
