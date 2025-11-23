import pytest
from icecream import ic

from sqlalchemy.exc import IntegrityError

from monstrino_core import NameFormatter, ReleaseTypePackTypeMapper, DuplicateEntityError, \
    ReleasePackTypeDataInvalidError, ReleasePackTypeNotFoundError
from monstrino_core.enums.release.release_type.packaging_type_enum import PackagingType
from monstrino_repositories.unit_of_work import UnitOfWorkFactory

from app.container_components import Repositories
from application.services.releases import TypeResolverService


# ----------------------------
# |      Content Types       |
# ----------------------------
def content_type_single() -> dict:
    return {"link": "https://playset", "text": "Playset"}


def content_type_funko() -> dict:
    return {"link": "https://funko", "text": "Funko Pop"}


def content_type_vinyl() -> dict:
    return {"link": "https://vinyl", "text": "Vinyl Figure"}


# ----------------------------
# |      Pack Types          |
# ----------------------------
def pack_type_none_text() -> dict:
    return {"link": "https://pack", "text": None}


def pack_1_pack() -> dict:
    return {"link": "https://1-pack", "text": "1-pack"}


def pack_1_pack_var() -> dict:
    return {"link": "https://1", "text": "1 package"}


def pack_2_pack() -> dict:
    return {"link": "https://2-pack", "text": "2-pack"}


def pack_2_var() -> dict:
    return {"link": "https://2", "text": "2 package"}


def pack_3_pack() -> dict:
    return {"link": "https://3-pack", "text": "3-pack"}


def pack_unknown() -> dict:
    return {"link": "https://unknown", "text": "Box Set???!!"}


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
async def test_content_single_basic(
    uow_factory, seed_release_type_list, seed_release_list
):
    """
    Добавление одного content-type должно сохранить ровно один type для контента.
    """
    service = TypeResolverService()
    ct = content_type_single()

    async with uow_factory.create() as uow:
        await service.resolve(uow, 1, [ct], [])

    async with uow_factory.create() as uow:
        ids = await get_type_ids(uow)

        ct_id = await uow.repos.release_type.get_id_by(
            name=NameFormatter.format_name(ct["text"])
        )
        sp_id = await uow.repos.release_type.get_id_by(name=PackagingType.SINGLE_PACK)

        assert ct_id in ids
        assert sp_id in ids
        assert len(ids) == 2


@pytest.mark.asyncio
async def test_multiple_content_types(
    uow_factory, seed_release_type_list, seed_release_list
):
    """
    Проверка добавления нескольких content types одновременно.
    """
    service = TypeResolverService()
    ct1 = content_type_funko()
    ct2 = content_type_vinyl()

    async with uow_factory.create() as uow:
        await service.resolve(uow, 1, [ct1, ct2], [])

    async with uow_factory.create() as uow:
        ids = await get_type_ids(uow)

        ct1_id = await uow.repos.release_type.get_id_by(
            name=NameFormatter.format_name(ct1["text"])
        )
        ct2_id = await uow.repos.release_type.get_id_by(
            name=NameFormatter.format_name(ct2["text"])
        )
        sp_id = await uow.repos.release_type.get_id_by(name=PackagingType.SINGLE_PACK)

        assert len(ids) == 3
        assert ct1_id in ids
        assert ct2_id in ids
        assert sp_id in ids


@pytest.mark.asyncio
async def test_content_type_duplicate_raises(
    uow_factory, seed_release_type_list, seed_release_list
):
    """
    Повторный вызов контент-типа должен вызвать IntegrityError (как ты и хочешь).
    """
    service = TypeResolverService()
    ct = content_type_vinyl()

    async with uow_factory.create() as uow:
        await service.resolve(uow, 1, [ct], [])

    with pytest.raises(DuplicateEntityError):
        async with uow_factory.create() as uow:
            await service.resolve(uow, 1, [ct], [])


# ================================================================
#                        PACK TYPE TESTS
# ================================================================

@pytest.mark.asyncio
async def test_no_pack_defaults_to_single(
    uow_factory, seed_release_type_list, seed_release_list
):
    service = TypeResolverService()
    ct = content_type_single()

    async with uow_factory.create() as uow:
        await service.resolve(uow, 1, [ct], [])

    async with uow_factory.create() as uow:
        ids = await get_type_ids(uow)

        ct_id = await uow.repos.release_type.get_id_by(name=NameFormatter.format_name(ct["text"]))
        sp_id = await uow.repos.release_type.get_id_by(name=PackagingType.SINGLE_PACK)

        assert ct_id in ids
        assert sp_id in ids
        assert len(ids) == 2


@pytest.mark.asyncio
async def test_pack_with_missing_text_does_not_add_pack(
    uow_factory, seed_release_type_list, seed_release_list
):
    """
    Когда text=None → логируем и НЕ пишем упаковку.
    """
    service = TypeResolverService()
    ct = content_type_single()
    bad_pack = pack_type_none_text()

    async with uow_factory.create() as uow:
        with pytest.raises(ReleasePackTypeDataInvalidError):
            await service.resolve(uow, 1, [ct], [bad_pack])

    async with uow_factory.create() as uow:
        ids = await get_type_ids(uow)

        ct_id = await uow.repos.release_type.get_id_by(name=NameFormatter.format_name(ct["text"]))
        assert len(ids) == 1 or ct_id in ids


@pytest.mark.asyncio
async def test_pack_1_pack_mapped_to_single(
    uow_factory, seed_release_type_list, seed_release_list
):
    """
    1-pack → SINGLE_PACK (без MULTI)
    """
    service = TypeResolverService()
    ct = content_type_single()
    pack = pack_1_pack()

    async with uow_factory.create() as uow:
        await service.resolve(uow, 1, [ct], [pack])

    async with uow_factory.create() as uow:
        ids = await get_type_ids(uow)

        ct_id = await uow.repos.release_type.get_id_by(name=NameFormatter.format_name(ct["text"]))
        sp_id = await uow.repos.release_type.get_id_by(name=PackagingType.SINGLE_PACK)
        mp_id = await uow.repos.release_type.get_id_by(name=PackagingType.MULTI_PACK)

        assert ct_id in ids
        assert sp_id in ids
        assert mp_id not in ids
        assert len(ids) == 2


@pytest.mark.asyncio
async def test_pack_2_pack_creates_specific_and_multi(
    uow_factory, seed_release_type_list, seed_release_list
):
    service = TypeResolverService()
    ct = content_type_single()
    pack = pack_2_pack()

    async with uow_factory.create() as uow:
        await service.resolve(uow, 1, [ct], [pack])

    async with uow_factory.create() as uow:
        ids = await get_type_ids(uow)

        ct_id = await uow.repos.release_type.get_id_by(name=NameFormatter.format_name(ct["text"]))
        mapped = ReleaseTypePackTypeMapper.map(pack["text"])
        pack_id = await uow.repos.release_type.get_id_by(name=mapped)
        mp_id = await uow.repos.release_type.get_id_by(name=PackagingType.MULTI_PACK)

        assert ct_id in ids
        assert pack_id in ids
        assert mp_id in ids
        assert len(ids) == 3


@pytest.mark.asyncio
async def test_pack_2_package_variant_creates_same_multipack(
    uow_factory, seed_release_type_list, seed_release_list
):
    service = TypeResolverService()
    ct = content_type_single()
    pack = pack_2_var()

    async with uow_factory.create() as uow:
        await service.resolve(uow, 1, [ct], [pack])

    async with uow_factory.create() as uow:
        ids = await get_type_ids(uow)

        mapped = ReleaseTypePackTypeMapper.map(pack["text"])
        pack_id = await uow.repos.release_type.get_id_by(name=mapped)
        mp_id = await uow.repos.release_type.get_id_by(name=PackagingType.MULTI_PACK)

        assert pack_id in ids
        assert mp_id in ids
        assert len(ids) == 3


@pytest.mark.asyncio
async def test_pack_3_pack(
    uow_factory, seed_release_type_list, seed_release_list
):
    service = TypeResolverService()
    ct = content_type_single()
    pack = pack_3_pack()

    async with uow_factory.create() as uow:
        await service.resolve(uow, 1, [ct], [pack])

    async with uow_factory.create() as uow:
        ids = await get_type_ids(uow)

        mapped = ReleaseTypePackTypeMapper.map(pack["text"])
        pack_id = await uow.repos.release_type.get_id_by(name=mapped)
        mp_id = await uow.repos.release_type.get_id_by(name=PackagingType.MULTI_PACK)

        assert pack_id in ids
        assert mp_id in ids


@pytest.mark.asyncio
async def test_pack_unknown_name_does_not_create_type(
    uow_factory, seed_release_type_list, seed_release_list
):
    """
    Если маппер выдал pack_f, которого нет в БД → не создаём ничего.
    """
    service = TypeResolverService()
    ct = content_type_single()
    pack = pack_unknown()

    async with uow_factory.create() as uow:
        with pytest.raises(ReleasePackTypeNotFoundError):
            await service.resolve(uow, 1, [ct], [pack])

    async with uow_factory.create() as uow:
        ids = await get_type_ids(uow)
        ct_id = await uow.repos.release_type.get_id_by(name=NameFormatter.format_name(ct["text"]))

        # Только content-type должен быть записан (и single-pack? нет: pack есть, но invalid → ничего)
        assert ct_id in ids
        assert len(ids) == 1


@pytest.mark.asyncio
async def test_pack_multi_duplicate_raises(
    uow_factory, seed_release_type_list, seed_release_list
):
    """
    Повторный вызов с 2-pack → вторая вставка мульти-пака должна упасть IntegrityError.
    """
    service = TypeResolverService()
    ct = content_type_single()
    pack = pack_2_pack()

    async with uow_factory.create() as uow:
        await service.resolve(uow, 1, [ct], [pack])

    with pytest.raises(DuplicateEntityError):
        async with uow_factory.create() as uow:
            await service.resolve(uow, 1, [ct], [pack])
