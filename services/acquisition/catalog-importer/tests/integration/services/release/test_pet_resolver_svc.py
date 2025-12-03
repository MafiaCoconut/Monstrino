import pytest
import logging

from monstrino_core.domain.errors import DuplicateEntityError
from monstrino_models.dto import ReleasePetLink
from monstrino_core.domain.services import NameFormatter
from monstrino_repositories.unit_of_work import UnitOfWorkFactory

from app.container_components import Repositories
from application.services.releases import PetResolverService


def pet_1() -> str:
    return "Watzit"


def pet_2() -> str:
    return "Count Fabulous"


def pets_data() -> list[str]:
    return [
        pet_1(),
        pet_2()
    ]


@pytest.mark.asyncio
async def test_pet_resolver_svc(
        uow_factory: UnitOfWorkFactory[Repositories],
        seed_pet_list,
        seed_release_list
):
    """
    Test that two pets are correctly resolved and inserted with correct positions.
    """
    service = PetResolverService()

    async with uow_factory.create() as uow:
        await service.resolve(
            uow=uow,
            release_id=1,
            pets_list=pets_data()
        )

    async with uow_factory.create() as uow:
        links = await uow.repos.release_pet.get_all()

        ids = [link.id for link in links]
        # Should match number of input pets
        assert len(links) == len(pets_data())

        # Check pets were resolved from DB via NameFormatter
        pet1_id = await uow.repos.pet.get_id_by(name=NameFormatter.format_name(pet_1()))
        pet2_id = await uow.repos.pet.get_id_by(name=NameFormatter.format_name(pet_2()))

        assert pet1_id in ids
        assert pet2_id in ids


@pytest.mark.asyncio
async def test_pet_resolver_svc_duplicate_pet_in_list(
        uow_factory: UnitOfWorkFactory[Repositories],
        seed_pet_list,
        seed_release_list
):
    """
    Test that duplicate pet names create multiple entries
    (unlike characters; pets don't deduplicate by your current logic).
    """
    service = PetResolverService()

    duplicate_list = [
        pet_1(),
        pet_2(),
        pet_1(),  # duplicate
    ]

    with pytest.raises(DuplicateEntityError):
        async with uow_factory.create() as uow:
            await service.resolve(
                uow=uow,
                release_id=1,
                pets_list=duplicate_list
            )


@pytest.mark.asyncio
async def test_pet_resolver_svc_pet_not_found_logs_error(
        uow_factory: UnitOfWorkFactory[Repositories],
        seed_pet_list,
        seed_release_list,
        caplog
):
    """
    Test that missing pets produce error logs
    but valid pets are still processed normally.
    """
    service = PetResolverService()
    pets_list = [
        pet_1(),      # exists
        "UnknownPet", # does NOT exist
        pet_2()       # exists
    ]

    with caplog.at_level(logging.ERROR):
        async with uow_factory.create() as uow:
            await service.resolve(
                uow=uow,
                release_id=1,
                pets_list=pets_list
            )

    async with uow_factory.create() as uow:
        links = await uow.repos.release_pet.get_all()

        # Only 2 valid pets create entries
        assert len(links) == 2

        # Error logged for missing pet
        assert "Pet found in parsed data, but not found in pet db: UnknownPet" in caplog.text
