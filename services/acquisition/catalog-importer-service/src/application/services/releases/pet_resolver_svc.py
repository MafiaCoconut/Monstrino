
from monstrino_core import NameFormatter
from monstrino_models.dto import ParsedRelease


class PetResolverService:
    async def resolve(self, uow, parsed: ParsedRelease) -> None:
        if not parsed.pets:
            return

        for pet_name in parsed.pets:
            pet_id = await uow.repos.pets.get_id_by_name(NameFormatter.format_name(pet_name))
            if pet_id:
                await uow.repos.release_pets.save_link(parsed.id, pet_id)
