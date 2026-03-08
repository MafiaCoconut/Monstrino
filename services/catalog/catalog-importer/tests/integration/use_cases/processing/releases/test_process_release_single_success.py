import pytest
from unittest.mock import AsyncMock

from monstrino_core.domain.services import TitleFormatter
from monstrino_repositories.unit_of_work import UnitOfWorkFactory
from monstrino_models.dto import Release, ParsedRelease

from app.ports import Repositories
from app.use_cases.processing.releases.process_release_single_use_case import ProcessReleaseSingleUseCase


@pytest.mark.asyncio
async def test_process_release_single_usecase_success(
        uow_factory: UnitOfWorkFactory[Repositories],
        seed_parsed_release_default: ParsedRelease  # Seed fixture and returned record
):
    """
    Check, that:
    - ParsedRelease извлечён
    - Release создан
    - ВСЕ resolver-сервисы вызваны
    - порядок вызовов корректен
    - image_processing_svc вызывается правильно
    """

    # --------- Arrange: ParsedRelease ----------
    parsed_release = seed_parsed_release_default

    # --------- Mock resolver services ----------
    character_resolver = AsyncMock()
    series_resolver = AsyncMock()
    exclusive_resolver = AsyncMock()
    pet_resolver = AsyncMock()
    reissue_resolver = AsyncMock()
    image_processing = AsyncMock()

    content_resolver = AsyncMock()
    pack_resolver = AsyncMock()
    tier_resolver = AsyncMock()

    processing_states_svc = AsyncMock()
    image_reference_svc = AsyncMock()

    # --------- Create UseCase ----------
    usecase = ProcessReleaseSingleUseCase(
        uow_factory=uow_factory,
        processing_states_svc=processing_states_svc,
        image_reference_svc=image_reference_svc,

        character_resolver_svc=character_resolver,
        series_resolver_svc=series_resolver,
        exclusive_resolver_svc=exclusive_resolver,
        pet_resolver_svc=pet_resolver,
        reissue_relation_svc=reissue_resolver,

        image_processing_svc=image_processing,

        content_type_resolver_svc=content_resolver,
        pack_type_resolver_svc=pack_resolver,
        tier_type_resolver_svc=tier_resolver,
    )

    # --------- EXECUTE ----------
    await usecase.execute(parsed_release_id=1)

    # --------- VALIDATE DB: Release created ----------
    async with uow_factory.create() as uow:
        releases = await uow.repos.release.get_all()
        assert len(releases) == 1

        rel = releases[0]
        assert rel.name == TitleFormatter.to_code(
            parsed_release.name)  # formatted
        assert rel.display_name == parsed_release.name
        assert rel.year == parsed_release.year
        assert rel.mpn == parsed_release.mpn
        assert rel.description == parsed_release.description_raw
        assert rel.text_from_box == parsed_release.from_the_box_text_raw

    # --------- VALIDATE calls to resolver services ---------

    character_resolver.resolve.assert_awaited_once()
    args = character_resolver.resolve.await_args.kwargs
    assert args["release_id"] == rel.id
    assert args["characters"] == parsed_release.characters_raw

    series_resolver.resolve.assert_awaited_once()
    content_resolver.resolve.assert_awaited_once()
    pack_resolver.resolve.assert_awaited_once()
    tier_resolver.resolve.assert_awaited_once()
    exclusive_resolver.resolve.assert_awaited_once()
    pet_resolver.resolve.assert_awaited_once()
    reissue_resolver.resolve.assert_awaited_once()

    # --------- Image processing call ---------

    image_processing.process_images.assert_awaited_once()
    img_call = image_processing.process_images.await_args.kwargs

    assert img_call["release_id"] == rel.id
    assert img_call["primary_image"] == parsed_release.primary_image
    assert img_call["other_images_list"] == parsed_release.images
    assert img_call["image_reference_svc"] is image_reference_svc
