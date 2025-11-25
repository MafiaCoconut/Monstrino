import pytest
from monstrino_core.domain.errors import (
    DuplicateEntityError,
    ReleasePackTypeDataInvalidError,
    ReleasePackTypeNotFoundError,
    ReleaseContentTypeDataInvalidError,
)
from monstrino_core.domain.value_objects import ReleaseTypePackagingType
from monstrino_core.domain.services import NameFormatter, ReleaseTypePackTypeResolver

from app.container_components import Repositories
from application.services.releases import TypeResolverService


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
    """
    Добавление одного content-type должно сохранить ровно один type + single-pack.
    """
    service = TypeResolverService()
    ct = ct_playset()

    async with uow_factory.create() as uow:
        await service.resolve(uow, 1, [ct], "", "", "Test", "parser")

    async with uow_factory.create() as uow:
        ids = await get_type_ids(uow)

        ct_id = await uow.repos.release_type.get_id_by(name=NameFormatter.format_name(ct))
        sp_id = await uow.repos.release_type.get_id_by(name=ReleaseTypePackagingType.SINGLE_PACK)

        assert ct_id in ids
        assert sp_id in ids
        assert len(ids) == 2


@pytest.mark.asyncio
async def test_multiple_content_types(uow_factory, seed_release_type_list, seed_release_list):
    """
    Проверка добавления нескольких content types.
    """
    service = TypeResolverService()

    async with uow_factory.create() as uow:
        await service.resolve(
            uow,
            1,
            [ct_funko(), ct_vinyl()],
            "",
            "",
            "Test",
            "parser"
        )

    async with uow_factory.create() as uow:
        ids = await get_type_ids(uow)

        ct1_id = await uow.repos.release_type.get_id_by(name=NameFormatter.format_name(ct_funko()))
        ct2_id = await uow.repos.release_type.get_id_by(name=NameFormatter.format_name(ct_vinyl()))
        sp_id = await uow.repos.release_type.get_id_by(name=ReleaseTypePackagingType.SINGLE_PACK)

        assert ct1_id in ids
        assert ct2_id in ids
        assert sp_id in ids
        assert len(ids) == 3


@pytest.mark.asyncio
async def test_content_type_duplicate_raises(uow_factory, seed_release_type_list, seed_release_list):
    """
    Повторный вызов должен бросать DuplicateEntityError.
    """
    service = TypeResolverService()
    ct = ct_vinyl()

    async with uow_factory.create() as uow:
        await service.resolve(uow, 1, [ct], "", "", "Test", "parser")

    with pytest.raises(DuplicateEntityError):
        async with uow_factory.create() as uow:
            await service.resolve(uow, 1, [ct], "", "", "Test", "parser")


@pytest.mark.asyncio
async def test_content_empty_raises_error(uow_factory, seed_release_type_list, seed_release_list):
    service = TypeResolverService()
    with pytest.raises(ReleaseContentTypeDataInvalidError):
        async with uow_factory.create() as uow:
            await service.resolve(uow, 1, [], "", "", "Test", "parser")


# ================================================================
#                        PACK TYPE TESTS
# ================================================================

@pytest.mark.asyncio
async def test_no_pack_defaults_to_single(uow_factory, seed_release_type_list, seed_release_list):
    service = TypeResolverService()
    ct = ct_playset()

    async with uow_factory.create() as uow:
        await service.resolve(uow, 1, [ct], "", "", "Test", "parser")

    async with uow_factory.create() as uow:
        ids = await get_type_ids(uow)

        ct_id = await uow.repos.release_type.get_id_by(name=NameFormatter.format_name(ct))
        sp_id = await uow.repos.release_type.get_id_by(name=ReleaseTypePackagingType.SINGLE_PACK)

        assert ct_id in ids
        assert sp_id in ids
        assert len(ids) == 2


@pytest.mark.asyncio
async def test_pack_with_missing_text_raises(uow_factory, seed_release_type_list, seed_release_list):
    service = TypeResolverService()
    ct = ct_playset()

    with pytest.raises(ReleasePackTypeDataInvalidError):
        async with uow_factory.create() as uow:
            await service.resolve(uow, 1, [ct], None, "", "Test", "parser")


@pytest.mark.asyncio
async def test_pack_1_pack_mapped_to_single(uow_factory, seed_release_type_list, seed_release_list):
    """
    1-pack → SINGLE_PACK
    """
    service = TypeResolverService()

    async with uow_factory.create() as uow:
        await service.resolve(
            uow, 1, [ct_playset()], pack_1(), "", "Test", "parser"
        )

    async with uow_factory.create() as uow:
        ids = await get_type_ids(uow)

        sp_id = await uow.repos.release_type.get_id_by(name=ReleaseTypePackagingType.SINGLE_PACK)
        mp_id = await uow.repos.release_type.get_id_by(name=ReleaseTypePackagingType.MULTI_PACK)

        assert sp_id in ids
        assert mp_id not in ids
        assert len(ids) == 2  # content + single_pack


@pytest.mark.asyncio
async def test_pack_2_pack_creates_specific_and_multi(uow_factory, seed_release_type_list, seed_release_list):
    service = TypeResolverService()

    async with uow_factory.create() as uow:
        await service.resolve(uow, 1, [ct_playset()], pack_2(), "", "Test", "parser")

    async with uow_factory.create() as uow:
        ids = await get_type_ids(uow)

        mapped = ReleaseTypePackTypeResolver.map(pack_2())
        pack_id = await uow.repos.release_type.get_id_by(name=mapped)
        mp_id = await uow.repos.release_type.get_id_by(name=ReleaseTypePackagingType.MULTI_PACK)

        assert pack_id in ids
        assert mp_id in ids
        assert len(ids) == 3


@pytest.mark.asyncio
async def test_pack_unknown_name_raises(uow_factory, seed_release_type_list, seed_release_list):
    service = TypeResolverService()

    with pytest.raises(ReleasePackTypeNotFoundError):
        async with uow_factory.create() as uow:
            await service.resolve(
                uow, 1, [ct_playset()], pack_unknown(), "", "Test", "parser"
            )


@pytest.mark.asyncio
async def test_pack_multi_duplicate_raises(uow_factory, seed_release_type_list, seed_release_list):
    service = TypeResolverService()

    async with uow_factory.create() as uow:
        await service.resolve(uow, 1, [ct_playset()], pack_2(), "", "Test", "parser")

    with pytest.raises(DuplicateEntityError):
        async with uow_factory.create() as uow:
            await service.resolve(uow, 1, [ct_playset()], pack_2(), "", "Test", "parser")
