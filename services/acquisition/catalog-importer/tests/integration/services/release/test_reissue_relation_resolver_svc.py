import pytest
import logging

from monstrino_core.domain.value_objects.release import ReleaseRelationType
from monstrino_models.dto import ReleaseRelationLink
from monstrino_core.domain.services import NameFormatter
from monstrino_core.domain.errors import (
    RelatedReleaseNotFoundError,
    ReleaseRelationTypeNotFoundError
)
from monstrino_repositories.unit_of_work import UnitOfWorkFactory

from application.services.releases import ReissueRelationResolverService
from bootstrap.container_components import Repositories


# Helpers
def reissue_1() -> str:
    return "Draculaura Ghouls Rule"


def reissue_2() -> str:
    return "Frankie Stein - Sweet 1600"


def reissue_list() -> list[str]:
    return [
        reissue_1(),
        reissue_2()
    ]


# ---------------------------------------------------------------
# 1) SUCCESS CASE: оба reissue найдены
# ---------------------------------------------------------------

@pytest.mark.asyncio
async def test_reissue_relation_svc_success(
        uow_factory: UnitOfWorkFactory[Repositories],
        seed_release_list,
        seed_relation_type_list,
):
    """
    Test: два reissue есть в БД → создаются 2 связи
    """
    service = ReissueRelationResolverService()
    formatted_names = [NameFormatter.format_name(x) for x in reissue_list()]

    # Run service
    async with uow_factory.create() as uow:
        await service.resolve(
            uow=uow,
            release_id=1,
            reissue_list=reissue_list()
        )

    # Validate results
    async with uow_factory.create() as uow:
        links: list[ReleaseRelationLink] = await uow.repos.release_relation_link.get_all()
        assert len(links) == 2

        reissue_type_id = await uow.repos.relation_type.get_id_by(name=ReleaseRelationType.REISSUE)

        # Check both related releases resolved correctly
        for i, rel_name in enumerate(formatted_names):
            release_obj = await uow.repos.release.get_one_by(name=rel_name)
            assert release_obj is not None

            link = links[i]
            assert link.release_id == 1
            assert link.related_release_id == release_obj.id
            assert link.relation_type_id == reissue_type_id


# ---------------------------------------------------------------
# 2) ERROR: relation_type "reissue" отсутствует
# ---------------------------------------------------------------

@pytest.mark.asyncio
async def test_reissue_relation_svc_relation_type_missing(
        uow_factory: UnitOfWorkFactory[Repositories],
        seed_release_list,
):
    """
    Test: relation_type(REISSUE) нет → сервис должен выбросить ReleaseRelationTypeNotFoundError
    """
    service = ReissueRelationResolverService()

    async with uow_factory.create() as uow:
        with pytest.raises(ReleaseRelationTypeNotFoundError):
            await service.resolve(
                uow=uow,
                release_id=1,
                reissue_list=reissue_list()
            )


# ---------------------------------------------------------------
# 3) ERROR: один из reissue не найден в БД
# ---------------------------------------------------------------

@pytest.mark.asyncio
async def test_reissue_relation_svc_reissue_not_found(
        uow_factory: UnitOfWorkFactory[Repositories],
        seed_release_list,
        seed_relation_type_list,
):
    """
    Test: второй reissue отсутствует → выбрасывается RelatedReleaseNotFoundError
    """
    service = ReissueRelationResolverService()

    reissues = [
        reissue_1(),            # существует
        "NonExistingRelease"    # отсутствует
    ]

    async with uow_factory.create() as uow:
        with pytest.raises(RelatedReleaseNotFoundError):
            await service.resolve(
                uow=uow,
                release_id=1,
                reissue_list=reissues
            )


# ---------------------------------------------------------------
# 4) Проверка: имя форматируется через NameFormatter
# ---------------------------------------------------------------

@pytest.mark.asyncio
async def test_reissue_relation_svc_name_formatter_applied(
        uow_factory: UnitOfWorkFactory[Repositories],
        seed_release_list,
        seed_relation_type_list,
):
    """
    Test: сервис должен искать release по форматированному имени
    """
    service = ReissueRelationResolverService()

    target_name = reissue_1()
    formatted = NameFormatter.format_name(target_name)

    async with uow_factory.create() as uow:
        await service.resolve(
            uow=uow,
            release_id=1,
            reissue_list=[target_name]
        )

    async with uow_factory.create() as uow:
        # Ensure lookup was successful
        release_obj = await uow.repos.release.get_one_by(name=formatted)
        assert release_obj is not None

        links = await uow.repos.release_relation_link.get_all()
        assert len(links) == 1
        assert links[0].related_release_id == release_obj.id
