import pytest

from integration.common import BaseCrudRepoTest
from monstrino_models.dto import PetExternalReference
from monstrino_testing.fixtures.data.catalog.ids import (
    PET_ROCKSEENA_ID,
    SOURCE_FANDOM_ID,
    fixture_uuid,
)


@pytest.mark.usefixtures("seed_pet_list", "seed_source_list", "seed_pet_external_reference_list")
class TestPetExternalReferenceRepo(BaseCrudRepoTest):
    entity_cls = PetExternalReference
    repo_attr = "pet_external_reference"

    sample_create_data = {
        "id": fixture_uuid("test.catalog.pet_external_reference.rockseena.fandom"),
        "pet_id": PET_ROCKSEENA_ID,
        "source_id": SOURCE_FANDOM_ID,
        "external_id": "fandom:watzie",
    }

    unique_field = PetExternalReference.ID
    unique_field_value = fixture_uuid("test.catalog.pet_external_reference.rockseena.fandom")
    update_field = PetExternalReference.EXTERNAL_ID
    updated_value = "fandom:watzie-updated"
