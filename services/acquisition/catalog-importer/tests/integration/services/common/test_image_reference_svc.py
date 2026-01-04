import pytest
from asyncpg import ForeignKeyViolationError, UniqueViolationError
from monstrino_core.domain.errors import DuplicateEntityError
from monstrino_core.domain.value_objects import CharacterGender
from monstrino_core.shared.enums import ProcessingStates

from monstrino_models.dto import ImageReferenceOrigin, Character, ImageImportQueue
from monstrino_models.enums import EntityName
from monstrino_repositories.unit_of_work import UnitOfWorkFactory

from application.services.common import ImageReferenceService
from application.ports import Repositories


# ---------------------------------------------------------
# Helpers
# ---------------------------------------------------------

def ref_character_active() -> ImageReferenceOrigin:
    return ImageReferenceOrigin(
        entity="Character",
        table=EntityName.CHARACTER,
        field=Character.PRIMARY_IMAGE,
        description="Main image",
        is_active=True,
    )


def ref_character_inactive() -> ImageReferenceOrigin:
    return ImageReferenceOrigin(
        entity="Character",
        table=EntityName.CHARACTER,
        field=Character.PRIMARY_IMAGE,
        description="Main image",
        is_active=False,
    )


def dummy_character() -> Character:
    return Character(
        name="Frankie",
        display_name="Frankie",
        gender=CharacterGender.GHOUL,
        description="Monster",
        primary_image="https://example.com/x.jpg",
        alt_names=None,
        notes=None,
    )

# =========================================================
# 1. Success
# =========================================================
@pytest.mark.asyncio
async def test_set_image_to_process(
        uow_factory: UnitOfWorkFactory[Repositories],
):

    svc = ImageReferenceService()
    async with uow_factory.create() as uow:
        ref =await uow.repos.image_reference_origin.save(ref_character_active())
        ch = await uow.repos.character.save(dummy_character())

        await svc.set_image_to_process(
            uow,
            EntityName.CHARACTER,
            Character.PRIMARY_IMAGE,
            ch.primary_image,
            ch.id
        )

    # Verify the entry was created
    async with uow_factory.create() as uow:
        ref_id = await uow.repos.image_reference_origin.get_id_by_table_and_field(EntityName.CHARACTER, Character.PRIMARY_IMAGE)

        fetched_queue = await uow.repos.image_import_queue.get_one_by(
            origin_reference_id=ref_id,
        )
        assert fetched_queue is not None
        assert fetched_queue.processing_state == ProcessingStates.INIT

# =========================================================
# 2. Reference not found → queue not created
# =========================================================
@pytest.mark.asyncio
async def test_reference_not_found(uow_factory: UnitOfWorkFactory[Repositories]):
    svc = ImageReferenceService()
    async with uow_factory.create() as uow:
        ch = await uow.repos.character.save(dummy_character())

        await svc.set_image_to_process(
            uow,
            table=EntityName.CHARACTER,
            field=Character.PRIMARY_IMAGE,
            image_link=ch.primary_image,
            record_id=ch.id,
        )

    # verify queue is empty
    async with uow_factory.create() as uow:
        all_items = await uow.repos.image_import_queue.get_all()
        assert len(all_items) == 0


# =========================================================
# 3. image_link = "" or None → no queue entry
# =========================================================
@pytest.mark.asyncio
async def test_empty_image_link(uow_factory: UnitOfWorkFactory[Repositories]):

    svc = ImageReferenceService()
    async with uow_factory.create() as uow:
        ref = await uow.repos.image_reference_origin.save(ref_character_active())
        ch = await uow.repos.character.save(dummy_character())

        # empty
        await svc.set_image_to_process(
            uow,
            EntityName.CHARACTER,
            Character.PRIMARY_IMAGE,
            "",
            ch.id,
        )

        # None
        await svc.set_image_to_process(
            uow,
            EntityName.CHARACTER,
            Character.PRIMARY_IMAGE,
            None,
            ch.id,
        )

    async with uow_factory.create() as uow:
        all_items = await uow.repos.image_import_queue.get_all()
        assert len(all_items) == 0


# =========================================================
# 4. record_id does not exist → FK violation
# (Do not needed because FK for record_id can not be implemented, weil it refers to different tables.)
# =========================================================
# @pytest.mark.asyncio
# async def test_invalid_record_id_fk_error(uow_factory: UnitOfWorkFactory[Repositories], seed_character_gender_list):
#
#     svc = ImageReferenceService()
#     async with uow_factory.create() as uow:
#         await uow.repos.image_reference_origin.save(ref_character_active())
#
#         # with pytest.raises(ForeignKeyViolationError):
#         await svc.set_image_to_process(
#             uow,
#             EntityName.CHARACTER,
#             Character.PRIMARY_IMAGE,
#             "https://example.com/x.jpg",
#             999999,  # nonexistent character
#         )


# =========================================================
# 5. Rollback on failure (simulate error during save)
# =========================================================
@pytest.mark.asyncio
async def test_rollback_on_error(uow_factory: UnitOfWorkFactory[Repositories], monkeypatch):

    svc = ImageReferenceService()

    async with uow_factory.create() as uow:
        ref = await uow.repos.image_reference_origin.save(ref_character_active())
        ch = await uow.repos.character.save(dummy_character())

        # force failure inside image_import_queue.save()
        async def broken_save(obj):
            raise RuntimeError("Simulated failure")

        monkeypatch.setattr(uow.repos.image_import_queue, "save", broken_save)

        with pytest.raises(RuntimeError):
            await svc.set_image_to_process(
                uow,
                EntityName.CHARACTER,
                Character.PRIMARY_IMAGE,
                ch.primary_image,
                ch.id,
            )

    # verify rollback: entry must NOT exist
    async with uow_factory.create() as uow:
        items = await uow.repos.image_import_queue.get_all()
        assert len(items) == 0


# =========================================================
# 6. Idempotency / duplicates not allowed
# =========================================================
@pytest.mark.asyncio
async def test_duplicates_not_allowed(uow_factory: UnitOfWorkFactory[Repositories]):

    svc = ImageReferenceService()
    async with uow_factory.create() as uow:
        await uow.repos.image_reference_origin.save(ref_character_active())
        ch = await uow.repos.character.save(dummy_character())
        await svc.set_image_to_process(
            uow, EntityName.CHARACTER, Character.PRIMARY_IMAGE, ch.primary_image, ch.id
        )


    async with uow_factory.create() as uow:
        # call twice
        with pytest.raises(DuplicateEntityError):
            await svc.set_image_to_process(
                uow, EntityName.CHARACTER, Character.PRIMARY_IMAGE, ch.primary_image, ch.id
            )

    async with uow_factory.create() as uow:
        items = await uow.repos.image_import_queue.get_all()
        assert len(items) == 1


# =========================================================
# 7. Initial state is ProcessingStates.INIT
# =========================================================
@pytest.mark.asyncio
async def test_initial_state_is_init(uow_factory: UnitOfWorkFactory[Repositories]):

    svc = ImageReferenceService()
    async with uow_factory.create() as uow:
        await uow.repos.image_reference_origin.save(ref_character_active())
        ch = await uow.repos.character.save(dummy_character())

        await svc.set_image_to_process(
            uow, EntityName.CHARACTER, Character.PRIMARY_IMAGE, ch.primary_image, ch.id
        )

    async with uow_factory.create() as uow:
        items = await uow.repos.image_import_queue.get_all()
        assert len(items) == 1
        assert items[0].processing_state == ProcessingStates.INIT


# =========================================================
# 8. Nested / unusual field name is supported
# =========================================================
@pytest.mark.asyncio
async def test_nested_field_supported(uow_factory: UnitOfWorkFactory[Repositories]):

    svc = ImageReferenceService()
    nested_field = "profile.avatar"  # unusual field

    ref = ImageReferenceOrigin(
        entity="Character",
        table=EntityName.CHARACTER,
        field=nested_field,
        is_active=True,
    )

    async with uow_factory.create() as uow:
        await uow.repos.image_reference_origin.save(ref)
        ch = await uow.repos.character.save(dummy_character())

        await svc.set_image_to_process(
            uow,
            EntityName.CHARACTER,
            nested_field,
            ch.primary_image,
            ch.id,
        )

    async with uow_factory.create() as uow:
        items = await uow.repos.image_import_queue.get_all()
        assert len(items) == 1
        assert items[0].origin_reference_id is not None


# =========================================================
# 9. Batch performance (10 items)
# =========================================================
@pytest.mark.asyncio
async def test_batch_10_items(uow_factory: UnitOfWorkFactory[Repositories]):

    svc = ImageReferenceService()
    async with uow_factory.create() as uow:
        await uow.repos.image_reference_origin.save(ref_character_active())

        characters = []
        for i in range(10):
            ch = Character(
                name=f"C{i}",
                display_name=f"C{i}",
                gender=CharacterGender.GHOUL,
                description="",
                primary_image=f"https://example.com/{i}.jpg",
                alt_names=None,
                notes=None,
            )
            characters.append(await uow.repos.character.save(ch))

        for ch in characters:
            await svc.set_image_to_process(
                uow,
                EntityName.CHARACTER,
                Character.PRIMARY_IMAGE,
                ch.primary_image,
                ch.id,
            )

    async with uow_factory.create() as uow:
        items = await uow.repos.image_import_queue.get_all()
        assert len(items) == 10

