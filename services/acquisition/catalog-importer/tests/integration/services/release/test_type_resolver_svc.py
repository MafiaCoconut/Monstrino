import pytest
from icecream import ic
from monstrino_core.domain.errors import (
    DuplicateEntityError,
    ReleasePackTypeDataInvalidError,
    ReleasePackTypeNotFoundError,
    ReleaseContentTypeDataInvalidError, ReleaseTypeNotFoundError,
)
from monstrino_core.domain.value_objects import ReleaseTypePackCountType, ReleaseTypeContentType, ReleaseTypeTierType
from monstrino_core.domain.services import TitleFormatter, ReleaseTypePackTypeResolver

from app.ports import Repositories
from app.services.releases import ContentTypeResolverService
from app.services.releases.type_resolver_svc import TypeResolverService, PackTypeResolverService, \
    TierTypeResolverService


# ----------------------------
# |      Content Types       |
# ----------------------------
def ct_playset() -> str:
    return "Playset"


def ct_funko() -> str:
    return "Funko Pop"


def ct_vinyl() -> str:
    return "Vinyl Figure"


# ----------------------------
# |      Pack Types          |
# ----------------------------
def pack_none() -> str:
    return ""


def pack_1() -> str:
    return "1-pack"


def pack_1_variant() -> str:
    return "1 package"


def pack_2() -> str:
    return "2-pack"


def pack_2_variant() -> str:
    return "2 package"


def pack_3() -> str:
    return "3-pack"


def pack_unknown() -> str:
    return "Box Set???!!"


# ----------------------------
# |     Helper functions     |
# ----------------------------

async def get_type_ids(uow):
    links = await uow.repos.release_type_link.get_all()
    return {link.type_id for link in links}


# ================================================================
#                     CONTENT TYPE TESTS
# ================================================================

@pytest.mark.asyncio
async def test_content_single_basic(uow_factory, seed_release_type_list, seed_release_list):
    service = ContentTypeResolverService()
    ct = ct_playset()

    async with uow_factory.create() as uow:
        await service.resolve(uow, 1, [ct])

    async with uow_factory.create() as uow:
        ids = await get_type_ids(uow)
        ct_id = await uow.repos.release_type.get_id_by(name=TitleFormatter.to_code(ct))

        assert ct_id in ids
        assert len(ids) == 1


@pytest.mark.asyncio
async def test_multiple_content_types(uow_factory, seed_release_type_list, seed_release_list):
    """
    Проверка добавления нескольких content types.
    """
    service = ContentTypeResolverService()

    async with uow_factory.create() as uow:
        await service.resolve(
            uow,
            1,
            [ct_funko(), ct_vinyl()]
        )

    async with uow_factory.create() as uow:
        ids = await get_type_ids(uow)

        ct1_id = await uow.repos.release_type.get_id_by(name=TitleFormatter.to_code(ct_funko()))
        ct2_id = await uow.repos.release_type.get_id_by(name=TitleFormatter.to_code(ct_vinyl()))

        assert ct1_id in ids
        assert ct2_id in ids
        assert len(ids) == 2


@pytest.mark.asyncio
async def test_content_type_duplicate_raises(uow_factory, seed_release_type_list, seed_release_list):
    """
    Повторный вызов должен бросать DuplicateEntityError.
    """
    service = ContentTypeResolverService()
    ct = ct_vinyl()

    async with uow_factory.create() as uow:
        await service.resolve(uow, 1, [ct])

    with pytest.raises(DuplicateEntityError):
        async with uow_factory.create() as uow:
            await service.resolve(uow, 1, [ct])


@pytest.mark.asyncio
async def test_content_type_null_list(uow_factory, seed_release_type_list, seed_release_list):
    service = ContentTypeResolverService()
    async with uow_factory.create() as uow:
        await service.resolve(uow, 1, [])

    async with uow_factory.create() as uow:
        ids = await get_type_ids(uow)
        assert len(ids) == 0


# ================================================================
#                        PACK TYPE TESTS
# ================================================================

@pytest.mark.asyncio
async def test_no_pack_defaults_to_single(uow_factory, seed_release_type_list, seed_release_list):
    service = PackTypeResolverService()

    async with uow_factory.create() as uow:
        await service.resolve(uow, 1, [], release_character_count=1)

    async with uow_factory.create() as uow:
        ids = await get_type_ids(uow)

        sp_id = await uow.repos.release_type.get_id_by(name=ReleaseTypePackCountType.SINGLE_PACK)

        assert sp_id in ids
        assert len(ids) == 1


# @pytest.mark.asyncio
# async def test_pack_with_missing_text_raises(uow_factory, seed_release_type_list, seed_release_list):
#     service = PackTypeResolverService()
#     ct = ct_playset()
#
#     with pytest.raises(ReleasePackTypeDataInvalidError):
#         async with uow_factory.create() as uow:
#             await service.resolve(uow, 1, [ct], None, "", "Test", "parser")


@pytest.mark.asyncio
async def test_pack_1_pack_mapped_to_single(uow_factory, seed_release_type_list, seed_release_list):
    """
    1-pack → SINGLE_PACK
    """
    service = PackTypeResolverService()

    async with uow_factory.create() as uow:
        await service.resolve(
            uow, 1, [pack_1()], 1
        )

    async with uow_factory.create() as uow:
        ids = await get_type_ids(uow)

        sp_id = await uow.repos.release_type.get_id_by(name=ReleaseTypePackCountType.SINGLE_PACK)
        mp_id = await uow.repos.release_type.get_id_by(name=ReleaseTypePackCountType.MULTIPACK)

        assert sp_id in ids
        assert mp_id not in ids
        assert len(ids) == 1


@pytest.mark.asyncio
async def test_pack_2_pack_creates_specific_and_multi(uow_factory, seed_release_type_list, seed_release_list):
    service = PackTypeResolverService()

    async with uow_factory.create() as uow:
        await service.resolve(uow, 1, [pack_2()], 2)

    async with uow_factory.create() as uow:
        ids = await get_type_ids(uow)

        mapped = ReleaseTypePackTypeResolver.normalize(pack_2())
        pack_id = await uow.repos.release_type.get_id_by(name=mapped)
        mp_id = await uow.repos.release_type.get_id_by(name=ReleaseTypePackCountType.MULTIPACK)

        assert pack_id in ids
        assert mp_id in ids
        assert len(ids) == 2


@pytest.mark.asyncio
async def test_pack_unknown_name_raises(uow_factory, seed_release_type_list, seed_release_list):
    service = PackTypeResolverService()

    with pytest.raises(ReleasePackTypeDataInvalidError):
        async with uow_factory.create() as uow:
            await service.resolve(
                uow, 1, [pack_unknown()], 1
            )


@pytest.mark.asyncio
async def test_pack_multi_duplicate_raises(uow_factory, seed_release_type_list, seed_release_list):
    service = PackTypeResolverService()

    async with uow_factory.create() as uow:
        await service.resolve(uow, 1, [pack_2()], 2)

    with pytest.raises(DuplicateEntityError):
        async with uow_factory.create() as uow:
            await service.resolve(uow, 1, [pack_2()], 2)


# ================================================================
#                     TIER TYPE TESTS
# ================================================================

@pytest.mark.asyncio
async def test_tier_explicit_valid(uow_factory, seed_release_type_list, seed_release_list):
    """
    Если tier передан и он валиден — он используется как есть.
    """
    service = TierTypeResolverService()

    async with uow_factory.create() as uow:
        await service.resolve(
            uow=uow,
            release_id=1,
            tier_type=ReleaseTypeTierType.COLLECTOR,
            release_title="Some Doll",
            release_source="amazon",
            has_deluxe_packaging=False,
        )

    async with uow_factory.create() as uow:
        ids = await get_type_ids(uow)
        t_id = await uow.repos.release_type.get_id_by(name=ReleaseTypeTierType.COLLECTOR)

        assert t_id in ids
        assert len(ids) == 1


@pytest.mark.asyncio
async def test_tier_mattel_creations_auto(uow_factory, seed_release_type_list, seed_release_list):
    """
    source = mattel-creations → COLLECTOR
    """
    service = TierTypeResolverService()

    async with uow_factory.create() as uow:
        await service.resolve(
            uow=uow,
            release_id=1,
            tier_type=None,
            release_title="Ghoulia",
            release_source="mattel-creations",
            has_deluxe_packaging=False,
        )

    async with uow_factory.create() as uow:
        ids = await get_type_ids(uow)
        tier_id = await uow.repos.release_type.get_id_by(name=ReleaseTypeTierType.COLLECTOR)

        assert tier_id in ids
        assert len(ids) == 1


@pytest.mark.asyncio
async def test_tier_keyword_collector(uow_factory, seed_release_type_list, seed_release_list):
    """
    KEYWORD ведёт к COLLECTOR (например 'exclusive')
    """
    service = TierTypeResolverService()

    async with uow_factory.create() as uow:
        await service.resolve(
            uow=uow,
            release_id=1,
            tier_type=None,
            release_title="Monster High Skullector",
            release_source="target",
            has_deluxe_packaging=False,
        )

    async with uow_factory.create() as uow:
        ids = await get_type_ids(uow)
        c_id = await uow.repos.release_type.get_id_by(name=ReleaseTypeTierType.COLLECTOR)

        assert c_id in ids
        assert len(ids) == 1


@pytest.mark.asyncio
async def test_tier_deluxe_flag(uow_factory, seed_release_type_list, seed_release_list):
    """
    Если has_deluxe_packaging=True → DELUXE
    """
    service = TierTypeResolverService()

    async with uow_factory.create() as uow:
        await service.resolve(
            uow=uow,
            release_id=1,
            tier_type=None,
            release_title="Clawdeen Wolf",
            release_source="amazon",
            has_deluxe_packaging=True,
        )

    async with uow_factory.create() as uow:
        ids = await get_type_ids(uow)
        d_id = await uow.repos.release_type.get_id_by(name=ReleaseTypeTierType.DELUXE)

        assert d_id in ids
        assert len(ids) == 1


@pytest.mark.asyncio
async def test_tier_keyword_deluxe(uow_factory, seed_release_type_list, seed_release_list):
    """
    keyword от DELUXE_KEYWORDS → DELUXE
    """
    service = TierTypeResolverService()

    async with uow_factory.create() as uow:
        await service.resolve(
            uow=uow,
            release_id=1,
            tier_type=None,
            release_title="Holiday Deluxe Edition Doll",
            release_source="amazon",
            has_deluxe_packaging=False,
        )

    async with uow_factory.create() as uow:
        ids = await get_type_ids(uow)
        d_id = await uow.repos.release_type.get_id_by(name=ReleaseTypeTierType.DELUXE)

        assert d_id in ids
        assert len(ids) == 1


@pytest.mark.asyncio
async def test_tier_default_standard(uow_factory, seed_release_type_list, seed_release_list):
    """
    Если нет ключевых признаков → STANDARD
    """
    service = TierTypeResolverService()

    async with uow_factory.create() as uow:
        await service.resolve(
            uow=uow,
            release_id=1,
            tier_type=None,
            release_title="Regular Monster High Doll",
            release_source="amazon",
            has_deluxe_packaging=False,
        )

    async with uow_factory.create() as uow:
        ids = await get_type_ids(uow)
        std_id = await uow.repos.release_type.get_id_by(name=ReleaseTypeTierType.STANDARD)

        assert std_id in ids
        assert len(ids) == 1


@pytest.mark.asyncio
async def test_tier_explicit_invalid_falls_back(uow_factory, seed_release_type_list, seed_release_list):
    """
    Передан мусор → fallback resolve → STANDARD
    """
    service = TierTypeResolverService()

    async with uow_factory.create() as uow:
        await service.resolve(
            uow=uow,
            release_id=1,
            tier_type="NOT_A_TIER",   # invalid
            release_title="Some doll",
            release_source="random",
            has_deluxe_packaging=False,
        )

    async with uow_factory.create() as uow:
        ids = await get_type_ids(uow)
        std_id = await uow.repos.release_type.get_id_by(name=ReleaseTypeTierType.STANDARD)

        assert std_id in ids
        assert len(ids) == 1


@pytest.mark.asyncio
async def test_tier_duplicate_raises(uow_factory, seed_release_type_list, seed_release_list):
    """
    Повторное сохранение tier link вызывает DuplicateEntityError.
    """
    from monstrino_core.domain.errors import DuplicateEntityError

    service = TierTypeResolverService()

    async with uow_factory.create() as uow:
        await service.resolve(
            uow=uow,
            release_id=1,
            tier_type=None,
            release_title="Standard Doll",
            release_source="amazon",
            has_deluxe_packaging=False,
        )

    with pytest.raises(DuplicateEntityError):
        async with uow_factory.create() as uow:
            await service.resolve(
                uow=uow,
                release_id=1,
                tier_type=None,
                release_title="Standard Doll",
                release_source="amazon",
                has_deluxe_packaging=False,
            )
