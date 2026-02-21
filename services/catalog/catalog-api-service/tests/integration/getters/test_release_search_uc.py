from typing import Optional
from unittest.mock import AsyncMock, Mock

import pytest
from icecream import ic
from monstrino_core.application.pagination import PageSpec, Page
from monstrino_repositories.unit_of_work import UnitOfWorkFactory

from app.queries.release_search import ReleaseSearchDTO
from domain.models.release_search import ReleaseSearchQuery, ReleaseListItem
from domain.models.release_search.release_filters import ReleaseFilters
from src.app.ports import Repositories
from src.app.use_cases.release_search import ReleaseSearchUseCase

def get_uc(
        uow_factory: UnitOfWorkFactory[Repositories],
) -> ReleaseSearchUseCase:
    return ReleaseSearchUseCase(uow_factory=uow_factory)

def build_dto(
    *,
    filters: Optional[ReleaseFilters] = None,
    limit: int = 30,
    offset: int = 0,
) -> ReleaseSearchDTO:
    """Builds ReleaseSearchDTO with defaults (transport-agnostic)."""
    query = ReleaseSearchQuery(
        filters=filters or ReleaseFilters(),
        page=PageSpec(limit=limit, offset=offset),
        include=None,  # Ignored by requirement
    )
    return ReleaseSearchDTO(
        query=query,
        # output/context ignored by requirement
    )


def assert_page_shape(page: Page) -> None:
    """Asserts Page base invariants."""
    assert page is not None
    assert isinstance(page, Page)
    assert isinstance(page.items, list)
    assert isinstance(page.total, int)
    assert isinstance(page.page, int)
    assert isinstance(page.page_size, int)

    assert page.total >= 0
    assert page.page >= 0
    assert page.page_size > 0


def assert_release_list_item_shape(item: ReleaseListItem) -> None:
    """Asserts ReleaseListItem base invariants."""
    assert item is not None
    assert isinstance(item, ReleaseListItem)

    assert isinstance(item.id, int)
    assert item.id > 0

    assert isinstance(item.name, str)
    assert item.name.strip() != ""

    assert isinstance(item.display_name, str)
    assert item.display_name.strip() != ""

    assert (item.year is None) or isinstance(item.year, int)
    assert (item.primary_image is None) or isinstance(item.primary_image, str)

    # release_types is Optional[list[dict]]
    if item.release_types is not None:
        assert isinstance(item.release_types, list)
        for rt in item.release_types:
            assert isinstance(rt, dict)


def find_item_by_id(items: list[ReleaseListItem], release_id: int) -> ReleaseListItem:
    for it in items:
        if it.id == release_id:
            return it
    raise AssertionError(f"ReleaseListItem with id={release_id} not found in page items")


# ---------------------------
# Placeholders to replace later
# ---------------------------

# Replace these with real IDs / values from your DB later.
EXPECTED_RELEASE_ID: int = 21
EXPECTED_NAME: str = "dawn-of-the-dance-lagoona-blue"
EXPECTED_DISPLAY_NAME: str = "Dawn of the Dance Lagoona Blue"
EXPECTED_YEAR: Optional[int] = 2011  # or 2012 etc.
EXPECTED_PRIMARY_IMAGE: Optional[str] = None  # or "https://..."
EXPECTED_RELEASE_TYPES_COUNT: Optional[int] = 3  # e.g. 2, or keep None to skip


SEARCH_TERM_THAT_SHOULD_MATCH: str = "TODO_SEARCH_TERM"
EXPECTED_MATCHED_RELEASE_ID: int = 21  # set to the release you know should match SEARCH_TERM_THAT_SHOULD_MATCH

YEAR_FROM: int = 2010
YEAR_TO: int = 2012

SERIES_ID: int = 1
CHARACTER_ID: int = 1
RELEASE_TYPE_ID: int = 1
EXCLUSIVE_ID: int = 1


# ---------------------------
# Tests
# ---------------------------

@pytest.mark.asyncio
async def test_release_search_returns_page_with_items(
    uow_factory: UnitOfWorkFactory[Repositories],
):
    use_case = get_uc(uow_factory)

    dto = build_dto(filters=ReleaseFilters(), limit=10, offset=0)
    result = await use_case.execute(dto)

    assert_page_shape(result)

    # Basic expectations: page_size should reflect requested limit (or your internal mapping)
    assert result.page_size == 10

    # Items must be ReleaseListItem
    for item in result.items:
        assert_release_list_item_shape(item)


@pytest.mark.asyncio
async def test_release_search_by_release_ids_contains_expected_release(
    uow_factory: UnitOfWorkFactory[Repositories],
):
    use_case = get_uc(uow_factory)

    dto = build_dto(
        filters=ReleaseFilters(release_ids=[EXPECTED_RELEASE_ID]),
        limit=30,
        offset=0,
    )
    result = await use_case.execute(dto)

    assert_page_shape(result)
    assert len(result.items) >= 1

    item = find_item_by_id(result.items, EXPECTED_RELEASE_ID)

    # ---- PLACEHOLDER ASSERTS (fill later with real expected values) ----
    assert item.id == EXPECTED_RELEASE_ID
    assert item.name == EXPECTED_NAME
    assert item.display_name == EXPECTED_DISPLAY_NAME
    assert item.year == EXPECTED_YEAR
    assert item.primary_image == EXPECTED_PRIMARY_IMAGE

    if EXPECTED_RELEASE_TYPES_COUNT is not None:
        assert item.release_types is not None
        assert len(item.release_types) == EXPECTED_RELEASE_TYPES_COUNT


@pytest.mark.asyncio
async def test_release_search_by_search_term_returns_expected_release(
    uow_factory: UnitOfWorkFactory[Repositories],
):
    use_case = get_uc(uow_factory)

    dto = build_dto(
        filters=ReleaseFilters(search=SEARCH_TERM_THAT_SHOULD_MATCH),
        limit=30,
        offset=0,
    )
    result = await use_case.execute(dto)

    assert_page_shape(result)

    # Must contain at least one match
    assert len(result.items) >= 1

    # Must contain the specific expected release (set later)
    _ = find_item_by_id(result.items, EXPECTED_MATCHED_RELEASE_ID)


@pytest.mark.asyncio
async def test_release_search_year_range_enforces_bounds(
    uow_factory: UnitOfWorkFactory[Repositories],
):
    use_case = get_uc(uow_factory)

    dto = build_dto(
        filters=ReleaseFilters(year_from=YEAR_FROM, year_to=YEAR_TO),
        limit=50,
        offset=0,
    )
    result = await use_case.execute(dto)

    assert_page_shape(result)

    for item in result.items:
        assert_release_list_item_shape(item)
        # If year is present, it must be within bounds
        if item.year is not None:
            assert YEAR_FROM <= item.year <= YEAR_TO


@pytest.mark.asyncio
async def test_release_search_has_images_true_returns_only_items_with_primary_image_or_images_logic(
    uow_factory: UnitOfWorkFactory[Repositories],
):
    use_case = get_uc(uow_factory)

    dto = build_dto(
        filters=ReleaseFilters(has_images=True),
        limit=50,
        offset=0,
    )
    result = await use_case.execute(dto)

    assert_page_shape(result)

    # Depending on your implementation, "has_images" may mean:
    # - primary_image is not None
    # - or some joined images exists while primary_image might still be None
    #
    # This placeholder checks the strict variant. Adjust later to your real rule.
    for item in result.items:
        assert_release_list_item_shape(item)
        assert item.primary_image is not None  # <-- adjust if your rule differs


@pytest.mark.asyncio
async def test_release_search_pagination_offset_changes_items(
    uow_factory: UnitOfWorkFactory[Repositories],
):
    use_case = get_uc(uow_factory)

    first_page = await use_case.execute(build_dto(filters=ReleaseFilters(), limit=5, offset=0))
    second_page = await use_case.execute(build_dto(filters=ReleaseFilters(), limit=5, offset=5))

    assert_page_shape(first_page)
    assert_page_shape(second_page)

    assert first_page.page_size == 5
    assert second_page.page_size == 5

    # If dataset has enough rows, items should differ.
    # Placeholder: if DB is small, you may need to increase dataset or relax this.
    if len(first_page.items) == 5 and len(second_page.items) > 0:
        first_ids = [x.id for x in first_page.items]
        second_ids = [x.id for x in second_page.items]
        assert first_ids != second_ids


@pytest.mark.asyncio
async def test_release_search_filters_series_character_release_type_exclusive_placeholders(
    uow_factory: UnitOfWorkFactory[Repositories],
):
    """
    This test is a placeholder for complex multi-filter scenarios.
    Fill SERIES_ID / CHARACTER_ID / RELEASE_TYPE_ID / EXCLUSIVE_ID with known values from your DB.
    """
    use_case = get_uc(uow_factory)

    dto = build_dto(
        filters=ReleaseFilters(
            series_ids=[SERIES_ID],
            character_ids=[CHARACTER_ID],
            release_type_ids=[RELEASE_TYPE_ID],
            exclusive_ids=[EXCLUSIVE_ID],
        ),
        limit=30,
        offset=0,
    )
    result = await use_case.execute(dto)

    assert_page_shape(result)

    # Placeholder: ensure at least one result exists once you set real IDs.
    assert len(result.items) >= 1

    # Optional: once you know a specific expected release for this combination, assert it exists:
    # expected_id = 123
    # _ = find_item_by_id(result.items, expected_id)