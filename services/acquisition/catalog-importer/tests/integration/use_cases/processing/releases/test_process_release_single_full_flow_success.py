import pytest
from unittest.mock import AsyncMock

from icecream import ic
from monstrino_core.domain.services import NameFormatter
from monstrino_core.domain.value_objects import CharacterRoleType, SeriesRelationTypes, ReleaseTypeTierType, \
    ReleaseTypePackType, ReleaseTypePackCountType, ReleaseTypeContentType
from monstrino_core.domain.value_objects.release import ReleaseRelationType
from monstrino_core.shared.enums import DatabaseOrderByTypes
from monstrino_repositories.base.dto import OrderSpec
from monstrino_repositories.unit_of_work import UnitOfWorkFactory
from monstrino_models.dto import Release, ParsedRelease, Character, CharacterRole, Series, ReleaseType, \
    ReleaseCharacter, ReleaseSeriesLink, ReleaseTypeLink, ReleaseExclusiveLink, ReleasePet, ReleaseImage, \
    ReleaseRelationLink, Pet

from app.container_components import Repositories
from application.services.common import ReleaseProcessingStatesService, ImageReferenceService
from application.services.releases import CharacterResolverService, SeriesResolverService, ExclusiveResolverService, \
    PetResolverService, ReissueRelationResolverService, ImageProcessingService, ContentTypeResolverService, \
    PackTypeResolverService, TierTypeResolverService
from application.use_cases.processing.releases.process_release_single_use_case import ProcessReleaseSingleUseCase

character_resolver = CharacterResolverService()
series_resolver = SeriesResolverService()
exclusive_resolver = ExclusiveResolverService()
pet_resolver = PetResolverService()
reissue_resolver = ReissueRelationResolverService()
image_processing = ImageProcessingService()

content_type_resolver = ContentTypeResolverService()
pack_type_resolver = PackTypeResolverService()
tier_type_resolver = TierTypeResolverService()

processing_states_svc = ReleaseProcessingStatesService()
image_reference_svc = ImageReferenceService()

def get_use_case(uow_factory):
    return ProcessReleaseSingleUseCase(
        uow_factory=uow_factory,
        processing_states_svc=processing_states_svc,
        image_reference_svc=image_reference_svc,

        character_resolver_svc=character_resolver,
        series_resolver_svc=series_resolver,
        exclusive_resolver_svc=exclusive_resolver,
        pet_resolver_svc=pet_resolver,
        reissue_relation_svc=reissue_resolver,

        image_processing_svc=image_processing,

        content_type_resolver_svc=content_type_resolver,
        pack_type_resolver_svc=pack_type_resolver,
        tier_type_resolver_svc=tier_type_resolver,
)


@pytest.mark.asyncio
async def test_process_release_single_one_charater(
        uow_factory: UnitOfWorkFactory[Repositories],
        seed_parsed_release_default,     # Seed ParsedRelease Fixtures
        seed_character_draculaura,
        seed_character_role_list,
        seed_series_ghouls_rule,
        seed_release_type_list,
        seed_relation_type_list,
):
    """
    Function test processing release with
    - 1 character
    - 1 series
    - 0 exclusive
    - 0 pet
    - reissue=False
    - pack_type=single
    - tier_type=standard

    Check that:
    - release created correctly
    - release character created correctly
    - release series link created correctly
    - release type created correctly
    - no release pet created
    - release images created correctly
    """

    # --------- Arrange: get seeded data ----------
    parsed_release: ParsedRelease = seed_parsed_release_default
    character: Character = seed_character_draculaura
    series: Series = seed_series_ghouls_rule

    # --------- EXECUTE ----------
    await get_use_case(uow_factory).execute(parsed_release_id=1)

    # --------- VALIDATE DB: release ---------
    async with uow_factory.create() as uow:
        releases = await uow.repos.release.get_all()
        assert len(releases) == 1

        release = releases[0]
        _validate_release(
            parsed_release=parsed_release,
            release=release,
        )

    # --------- VALIDATE DB: release character ---------
    async with uow_factory.create() as uow:
        release_characters = await uow.repos.release_character.get_all()
        assert len(release_characters) == len(parsed_release.characters_raw)

        _validate_release_character(
            parsed_release=parsed_release,
            release_character=release_characters[0],
            character_id=character.id,
            position=1,
            role_type_id=await uow.repos.character_role.get_id_by(name=CharacterRoleType.MAIN),
            is_uniq=True
        )

    # --------- VALIDATE DB: release series ---------
    async with uow_factory.create() as uow:
        release_series_link = await uow.repos.release_series_link.get_all()
        assert len(release_series_link) == len(parsed_release.series_raw)

        _validate_release_series(
            release_id=release.id,
            series_id=series.id,
            release_series_link=release_series_link[0],
        )

    # --------- VALIDATE DB: release types ---------
    async with uow_factory.create() as uow:
        release_type_links = await uow.repos.release_type_link.get_all()
        assert len(release_type_links) == 3  # doll pack, single pack, standard tier

        tier_type_id = await uow.repos.release_type.get_id_by(**{ReleaseType.NAME: ReleaseTypeTierType.STANDARD})
        pack_type_id = await uow.repos.release_type.get_id_by(**{ReleaseType.NAME:  ReleaseTypePackCountType.SINGLE_PACK})
        content_type_id = await uow.repos.release_type.get_id_by(**{ReleaseType.NAME: ReleaseTypeContentType.DOLL_FIGURE})
        _validate_release_type_links(
            release_type_links=release_type_links,
            tier_type_id=tier_type_id,
            pack_type_ids=[pack_type_id],
            content_type_ids=[content_type_id],
        )

    # --------- VALIDATE DB: release exclusive ---------
    async with uow_factory.create() as uow:
        release_exclusives = await uow.repos.release_exclusive_link.get_all()
        assert len(release_exclusives) == len(parsed_release.exclusive_vendor_raw)

    # --------- VALIDATE DB: release pets ---------

    async with uow_factory.create() as uow:
        release_pets = await uow.repos.release_pet.get_all()
        assert len(release_pets) == len(parsed_release.pet_names_raw)

    # --------- VALIDATE DB: release images ---------
    async with uow_factory.create() as uow:
        release_images = await uow.repos.release_image.get_all()
        assert len(release_images) == len(parsed_release.images) + 1  # + primary image

        _validate_release_images(
            parsed_release=parsed_release,
            release_images=release_images,
            release_id=release.id,
        )


async def test_process_release_single_usecase_pack_two(
        uow_factory: UnitOfWorkFactory[Repositories],
        seed_parsed_release_pack_two,  # Seed ParsedRelease Fixtures
        seed_character_cleo_de_nile,
        seed_character_deuce_gordon,
        seed_character_role_list,
        seed_series_boo_york,
        seed_release_type_list,
        seed_relation_type_list,
):
    """
    Function test processing release with
    - 2 character
    - 1 series
    - 0 exclusive
    - 0 pet
    - reissue=False
    - pack_type=single
    - tier_type=standard

    Check that:
    - 2 characters created correctly successfully
    - release type pack is 2-pack and multipack
    """

    # --------- Arrange: get seeded data ----------
    parsed_release: ParsedRelease = seed_parsed_release_pack_two
    character_g: Character = seed_character_cleo_de_nile
    character_m: Character = seed_character_deuce_gordon
    series: Series = seed_series_boo_york

    # --------- Execute ----------
    await get_use_case(uow_factory).execute(parsed_release_id=1)

    # --------- VALIDATE DB: release ---------
    async with uow_factory.create() as uow:
        releases = await uow.repos.release.get_all()
        assert len(releases) == 1
        release = releases[0]
        _validate_release(
            parsed_release=parsed_release,
            release=release,
        )

    # --------- VALIDATE DB: release character ---------
    async with uow_factory.create() as uow:
        release_characters = await uow.repos.release_character.get_all()
        assert len(release_characters) == len(parsed_release.characters_raw) # 2 characters

        _validate_release_character(
            parsed_release=parsed_release,
            release_character=release_characters[0],
            character_id=character_g.id,
            position=1,
            role_type_id=await uow.repos.character_role.get_id_by(name=CharacterRoleType.MAIN),
            is_uniq=False
        )

        _validate_release_character(
            parsed_release=parsed_release,
            release_character=release_characters[1],
            character_id=character_m.id,
            position=2,
            role_type_id=await uow.repos.character_role.get_id_by(name=CharacterRoleType.SECONDARY),
            is_uniq=False
        )


    # --------- VALIDATE DB: release series ---------
    async with uow_factory.create() as uow:
        release_series_link = await uow.repos.release_series_link.get_all()
        assert len(release_series_link) == len(parsed_release.series_raw)

        _validate_release_series(
            release_id=release.id,
            series_id=series.id,
            release_series_link=release_series_link[0],
        )

    # --------- VALIDATE DB: release types ---------
    async with uow_factory.create() as uow:
        release_type_links = await uow.repos.release_type_link.get_all()
        assert len(release_type_links) == 4  # doll, 2-pack, multipack, standard tier

        content_type_id = await uow.repos.release_type.get_id_by(**{ReleaseType.NAME: ReleaseTypeContentType.DOLL_FIGURE})
        pack_type_2_id = await uow.repos.release_type.get_id_by(**{ReleaseType.NAME:  ReleaseTypePackCountType.TWO_PACK})
        pack_type_multi_id = await uow.repos.release_type.get_id_by(**{ReleaseType.NAME:  ReleaseTypePackCountType.MULTIPACK})
        tier_type_id = await uow.repos.release_type.get_id_by(**{ReleaseType.NAME: ReleaseTypeTierType.STANDARD})

        _validate_release_type_links(
            release_type_links=release_type_links,
            tier_type_id=tier_type_id,
            pack_type_ids=[pack_type_2_id, pack_type_multi_id],
            content_type_ids=[content_type_id],
        )

    # --------- VALIDATE DB: release exclusive ---------
    async with uow_factory.create() as uow:
        release_exclusives = await uow.repos.release_exclusive_link.get_all()
        assert len(release_exclusives) == len(parsed_release.exclusive_vendor_raw)

    # --------- VALIDATE DB: release pets ---------
    async with uow_factory.create() as uow:
        release_pets = await uow.repos.release_pet.get_all()
        assert len(release_pets) == len(parsed_release.pet_names_raw)

    # --------- VALIDATE DB: release images ---------
    async with uow_factory.create() as uow:
        release_images = await uow.repos.release_image.get_all()
        _validate_release_images(
            parsed_release=parsed_release,
            release_images=release_images,
            release_id=release.id,
        )


async def test_process_release_single_usecase_3_pack_reissue_and_tier(
        uow_factory: UnitOfWorkFactory[Repositories],
        seed_parsed_release_pack3_reissue_tier,  # Seed ParsedRelease Fixtures
        seed_character_clawdeen_wolf,
        seed_character_draculaura,
        seed_character_frankie_stein,
        seed_character_role_list,
        seed_series_day_out,
        seed_release_type_list,
        seed_relation_type_list,
        seed_release_list_day_out
):
    """
    Function test processing release with
    - 3 character
    - 1 series
    - 0 exclusive
    - 0 pet
    - reissue=True
    - pack_type=3-pack
    - tier_type=budget

    Check that:
    - release created correctly
    - release characters created correctly
    - release series created correctly
    - release type content is doll
    - release type pack is 3-pack
    - release type tier is budget
    - reissue created correcly
    """

    # --------- Arrange: get seeded data ---------------
    parsed_release: ParsedRelease = seed_parsed_release_pack3_reissue_tier
    character_c: Character = seed_character_clawdeen_wolf
    character_d: Character = seed_character_draculaura
    character_f: Character = seed_character_frankie_stein
    series: Series = seed_series_day_out

    # --------- Execute --------------------------------
    use_case = get_use_case(uow_factory)
    await use_case.execute(parsed_release_id=1)

    # --------- VALIDATE DB: release -------------------
    async with uow_factory.create() as uow:
        releases = await uow.repos.release.get_many_by(**{Release.DISPLAY_NAME: parsed_release.name})

        assert len(releases) == 1
        release = releases[0]
        _validate_release(release=release, parsed_release=parsed_release)

    # --------- VALIDATE DB: release character ---------
    async with uow_factory.create() as uow:
        r_cha_list = await uow.repos.release_character.get_many_by(
            order_spec=OrderSpec(
                field=ReleaseCharacter.CREATED_AT,
                direction=DatabaseOrderByTypes.ASC
            ),
            **{ReleaseCharacter.RELEASE_ID: release.id}
        )
        assert len(r_cha_list) == len(parsed_release.characters_raw) # 3 characters

        _validate_release_character(
            parsed_release=parsed_release,
            release_character=r_cha_list[0],
            character_id=character_c.id,
            position=1,
            role_type_id=await uow.repos.character_role.get_id_by(name=CharacterRoleType.MAIN),
            is_uniq=False
        )
        _validate_release_character(
            parsed_release=parsed_release,
            release_character=r_cha_list[1],
            character_id=character_d.id,
            position=2,
            role_type_id=await uow.repos.character_role.get_id_by(name=CharacterRoleType.SECONDARY),
            is_uniq=False
        )
        _validate_release_character(
            parsed_release=parsed_release,
            release_character=r_cha_list[2],
            character_id=character_f.id,
            position=3,
            role_type_id=await uow.repos.character_role.get_id_by(name=CharacterRoleType.SECONDARY),
            is_uniq=False
        )

    # --------- VALIDATE DB: release series ------------
    async with uow_factory.create() as uow:
        r_series = await uow.repos.release_series_link.get_many_by(**{ReleaseSeriesLink.RELEASE_ID: release.id})
        assert len(r_series) == len(parsed_release.series_raw)

        _validate_release_series(
            release_id=release.id,
            series_id=series.id,
            release_series_link=r_series[0],

        )

    # --------- VALIDATE DB: release types -------------
    async with uow_factory.create() as uow:
        r_type_links = await uow.repos.release_type_link.get_many_by(**{ReleaseTypeLink.RELEASE_ID: release.id})
        assert len(r_type_links) == 4  # 3-pack, multipack, budget tier, doll content

        tier_type_id = await uow.repos.release_type.get_id_by(**{ReleaseType.NAME: ReleaseTypeTierType.BUDGET})
        pack_type_3_id = await uow.repos.release_type.get_id_by(**{ReleaseType.NAME:  ReleaseTypePackCountType.THREE_PACK})
        pack_type_multi_id = await uow.repos.release_type.get_id_by(**{ReleaseType.NAME:  ReleaseTypePackCountType.MULTIPACK})
        content_type_id = await uow.repos.release_type.get_id_by(**{ReleaseType.NAME: ReleaseTypeContentType.DOLL_FIGURE})

        _validate_release_type_links(
            release_type_links=r_type_links,
            tier_type_id=tier_type_id,
            pack_type_ids=[pack_type_3_id, pack_type_multi_id],
            content_type_ids=[content_type_id]
        )
    # --------- VALIDATE DB: release exclusive ---------
    async with uow_factory.create() as uow:
        release_exclusives = await uow.repos.release_exclusive_link.get_all()
        assert len(release_exclusives) == len(parsed_release.exclusive_vendor_raw)

    # --------- VALIDATE DB: release pets ---------
    async with uow_factory.create() as uow:
        release_pets = await uow.repos.release_pet.get_all()
        assert len(release_pets) == len(parsed_release.pet_names_raw)

    # --------- VALIDATE DB: release images ---------
    async with uow_factory.create() as uow:
        release_images = await uow.repos.release_image.get_all()
        _validate_release_images(
            parsed_release=parsed_release,
            release_images=release_images,
            release_id=release.id,
        )

    # --------- VALIDATE DB: release reissue -----------
    async with uow_factory.create() as uow:
        reissue_links = await uow.repos.release_relation_link.get_all()
        assert len(reissue_links) == len(parsed_release.reissue_of_raw)

        release_relation_type_id = await uow.repos.relation_type.get_id_by(name=ReleaseRelationType.REISSUE)
        related_release_id_c = await uow.repos.release.get_id_by(display_name=parsed_release.reissue_of_raw[0])
        _validate_release_reissue(
            release_id=release.id,
            related_release_id=related_release_id_c,
            reissue_link=reissue_links[0],
            release_relation_type_id=release_relation_type_id,
        )

        related_release_id_d = await uow.repos.release.get_id_by(display_name=parsed_release.reissue_of_raw[1])
        _validate_release_reissue(
            release_id=release.id,
            related_release_id=related_release_id_d,
            reissue_link=reissue_links[1],
            release_relation_type_id=release_relation_type_id,
        )

        related_release_id_f = await uow.repos.release.get_id_by(display_name=parsed_release.reissue_of_raw[2])
        _validate_release_reissue(
            release_id=release.id,
            related_release_id=related_release_id_f,
            reissue_link=reissue_links[2],
            release_relation_type_id=release_relation_type_id,
        )

async def test_process_release_single_usecase_playset(
        uow_factory: UnitOfWorkFactory[Repositories],
        seed_parsed_release_playset,  # Seed ParsedRelease Fixtures
        seed_character_frankie_stein,
        seed_character_role_list,
        seed_release_type_list,
        seed_relation_type_list,
        seed_release_list_day_out
):
    """
    Function test processing release with
    - 1 character
    - 0 series
    - 0 exclusive
    - 0 pet
    - reissue=False
    - pack_type=single-pack
    - tier_type=standard

    Check that:
    - release created correctly
    - release characters created correctly
    - release type content is doll, playset
    - release type pack is single-pack
    - release type tier is standard
    """

    # --------- Arrange: get seeded data ---------------
    parsed_release: ParsedRelease = seed_parsed_release_playset
    character: Character = seed_character_frankie_stein
    # --------- Execute --------------------------------
    use_case = get_use_case(uow_factory)
    await use_case.execute(parsed_release_id=1)

    # --------- VALIDATE DB: release -------------------
    async with uow_factory.create() as uow:
        releases = await uow.repos.release.get_many_by(**{Release.DISPLAY_NAME: parsed_release.name})

        assert len(releases) == 1
        release = releases[0]
        _validate_release(release=release, parsed_release=parsed_release)

    # --------- VALIDATE DB: release character ---------
    async with uow_factory.create() as uow:
        r_cha_list = await uow.repos.release_character.get_all(order_spec=OrderSpec(
            field=ReleaseCharacter.CREATED_AT,
            direction=DatabaseOrderByTypes.ASC
        ))
        assert len(r_cha_list) == len(parsed_release.characters_raw) # 1 character
        _validate_release_character(
            parsed_release=parsed_release,
            release_character=r_cha_list[0],
            character_id=character.id,
            position=1,
            role_type_id=await uow.repos.character_role.get_id_by(name=CharacterRoleType.MAIN),
            is_uniq=True
        )
    # --------- VALIDATE DB: release series ------------
    async with uow_factory.create() as uow:
        r_series = await uow.repos.release_series_link.get_many_by(**{ReleaseSeriesLink.RELEASE_ID: release.id})
        assert len(r_series) == len(parsed_release.series_raw) # 0

    # --------- VALIDATE DB: release types -------------
    async with uow_factory.create() as uow:
        r_type_links = await uow.repos.release_type_link.get_many_by(**{ReleaseTypeLink.RELEASE_ID: release.id})
        assert len(r_type_links) == 4  # single-pack, standard tier, doll, playset

        tier_type_id = await uow.repos.release_type.get_id_by(**{ReleaseType.NAME: ReleaseTypeTierType.STANDARD})
        pack_type_id = await uow.repos.release_type.get_id_by(**{ReleaseType.NAME: ReleaseTypePackCountType.SINGLE_PACK})
        content_type_doll_id = await uow.repos.release_type.get_id_by(**{ReleaseType.NAME: ReleaseTypeContentType.DOLL_FIGURE})
        content_type_playset_id = await uow.repos.release_type.get_id_by(**{ReleaseType.NAME: ReleaseTypeContentType.PLAYSET})

    _validate_release_type_links(
        release_type_links=r_type_links,
        tier_type_id=tier_type_id,
        pack_type_ids=[pack_type_id],
        content_type_ids=[content_type_doll_id, content_type_playset_id]
    )

    # --------- VALIDATE DB: release exclusive ---------
    async with uow_factory.create() as uow:
        release_exclusives = await uow.repos.release_exclusive_link.get_all()
        assert len(release_exclusives) == len(parsed_release.exclusive_vendor_raw)

    # --------- VALIDATE DB: release pets --------------
    async with uow_factory.create() as uow:
        release_pets = await uow.repos.release_pet.get_all()
        assert len(release_pets) == len(parsed_release.pet_names_raw)

    # --------- VALIDATE DB: release images ------------
    async with uow_factory.create() as uow:
        release_images = await uow.repos.release_image.get_all()
        _validate_release_images(
            parsed_release=parsed_release,
            release_images=release_images,
            release_id=release.id,
        )

    # --------- VALIDATE DB: release reissue -----------
    async with uow_factory.create() as uow:
        reissue_links = await uow.repos.release_relation_link.get_all()
        assert len(reissue_links) == len(parsed_release.reissue_of_raw)

async def test_process_release_single_usecase_playset_two_pets(
        uow_factory: UnitOfWorkFactory[Repositories],
        seed_parsed_release_playset_two_pets,  # Seed ParsedRelease Fixtures
        character_draculaura: Character,
        pet_count_fabulous: Pet,
        pet_rockseena: Pet,

        seed_character_pet_ownership_dra_count_fabulous_rockseena,
        seed_character_role_list,
        seed_series_miscellaneous,
        seed_release_type_list,
        seed_relation_type_list,
        seed_release_list_day_out
):
    """
    Function test processing release with
    - 1 character
    - 1 series
    - 0 exclusive
    - 2 pet
    - reissue=False
    - pack_type=None
    - tier_type=standard

    Check that:
    - release created correctly
    - release character created correctly
    - release type content is doll-figure, playset, pet-figure
    - release type pack is None
    - release type tier is standard
    - release pets created correctly
    """

    # --------- Arrange: get seeded data ---------------
    parsed_release: ParsedRelease = seed_parsed_release_playset_two_pets
    async with uow_factory.create() as uow:
        character: Character = await uow.repos.character.get_one_by(**{Character.DISPLAY_NAME: character_draculaura.display_name})
        pet_c: Pet = await uow.repos.pet.get_one_by(**{Pet.NAME: pet_count_fabulous.name})
        pet_r: Pet = await uow.repos.pet.get_one_by(**{Pet.NAME: pet_rockseena.name})
    series: Series = seed_series_miscellaneous
    # --------- Execute --------------------------------
    use_case = get_use_case(uow_factory)
    await use_case.execute(parsed_release_id=1)

    # --------- VALIDATE DB: release -------------------
    async with uow_factory.create() as uow:
        releases = await uow.repos.release.get_many_by(**{Release.DISPLAY_NAME: parsed_release.name})

        assert len(releases) == 1
        release = releases[0]
        _validate_release(release=release, parsed_release=parsed_release)

    # --------- VALIDATE DB: release character ---------
    async with uow_factory.create() as uow:
        r_cha_list = await uow.repos.release_character.get_many_by(
            order_spec=OrderSpec(
                field=ReleaseCharacter.CREATED_AT,
                direction=DatabaseOrderByTypes.ASC
            ),
            **{ReleaseCharacter.RELEASE_ID: release.id}
        )
        assert len(r_cha_list) == len(parsed_release.characters_raw) # 1 character
        _validate_release_character(
            parsed_release=parsed_release,
            release_character=r_cha_list[0],
            character_id=character.id,
            position=1,
            role_type_id=await uow.repos.character_role.get_id_by(name=CharacterRoleType.MAIN),
            is_uniq=True
        )
    # --------- VALIDATE DB: release series ------------
    async with uow_factory.create() as uow:
        r_series = await uow.repos.release_series_link.get_many_by(**{ReleaseSeriesLink.RELEASE_ID: release.id})
        assert len(r_series) == len(parsed_release.series_raw) # 1

    # --------- VALIDATE DB: release types -------------
    async with uow_factory.create() as uow:
        r_type_links = await uow.repos.release_type_link.get_many_by(**{ReleaseTypeLink.RELEASE_ID: release.id})
        assert len(r_type_links) == 4  # standard tier, doll, playset, pet, 1-pack
        assert all(release_type_link.type_id not in ReleaseTypePackCountType for release_type_link in r_type_links) # No n-pack type

        tier_type_id = await uow.repos.release_type.get_id_by(**{ReleaseType.NAME: ReleaseTypeTierType.STANDARD})
        content_type_doll_id = await uow.repos.release_type.get_id_by(**{ReleaseType.NAME: ReleaseTypeContentType.DOLL_FIGURE})
        content_type_playset_id = await uow.repos.release_type.get_id_by(**{ReleaseType.NAME: ReleaseTypeContentType.PLAYSET})
        content_type_pet_id = await uow.repos.release_type.get_id_by(**{ReleaseType.NAME: ReleaseTypeContentType.PET_FIGURE})

    _validate_release_type_links(
        release_type_links=r_type_links,
        tier_type_id=tier_type_id,
        pack_type_ids=[],
        content_type_ids=[content_type_doll_id, content_type_playset_id, content_type_pet_id]
    )

    # --------- VALIDATE DB: release exclusive ---------
    async with uow_factory.create() as uow:
        release_exclusives = await uow.repos.release_exclusive_link.get_all()
        assert len(release_exclusives) == len(parsed_release.exclusive_vendor_raw)

    # --------- VALIDATE DB: release pets --------------
    async with uow_factory.create() as uow:
        release_pets = await uow.repos.release_pet.get_many_by(**{ReleasePet.RELEASE_ID: release.id})
        assert len(release_pets) == len(parsed_release.pet_names_raw) # 2 pets
        ic(pet_c)

        _validate_release_pet(
            parsed_release=parsed_release,
            release_pet=release_pets[0],
            pet_id=pet_c.id,
            position=1,
            is_uniq=False,
        )

        ic(pet_r)
        _validate_release_pet(
            parsed_release=parsed_release,
            release_pet=release_pets[1],
            pet_id=pet_r.id,
            position=2,
            is_uniq=False,
        )

    # --------- VALIDATE DB: release images ------------
    async with uow_factory.create() as uow:
        release_images = await uow.repos.release_image.get_all()
        _validate_release_images(
            parsed_release=parsed_release,
            release_images=release_images,
            release_id=release.id,
        )

    # --------- VALIDATE DB: release reissue -----------
    async with uow_factory.create() as uow:
        reissue_links = await uow.repos.release_relation_link.get_all()
        assert len(reissue_links) == len(parsed_release.reissue_of_raw)

async def test_process_release_single_usecase_reissue(
        uow_factory: UnitOfWorkFactory[Repositories],
        seed_parsed_release_reissue,
        seed_character_lagoona_blue,
        seed_release_dawn_of_the_dance_lagoona_blue,
        seed_series_dawn_of_the_dance,

        seed_character_role_list,
        seed_release_type_list,
        seed_relation_type_list,
):
    """
    Function test processing release with
    - 1 character
    - 1 series
    - 0 exclusive
    - 0 pet
    - reissue=True
    - pack_type=Single-pack
    - tier_type=standard

    Check that:
    - release created correctly
    - release character created correctly
    - release type content is doll-figure
    - release type pack is single
    - release type tier is standard
    - reissue created correcly
    """

    # --------- Arrange: get seeded data ---------------
    parsed_release: ParsedRelease = seed_parsed_release_reissue
    character: Character = seed_character_lagoona_blue
    rel_reissue: Release = seed_release_dawn_of_the_dance_lagoona_blue
    # --------- Execute --------------------------------
    use_case = get_use_case(uow_factory)
    await use_case.execute(parsed_release_id=1)
    # --------- VALIDATE DB: release -------------------
    async with uow_factory.create() as uow:
        releases = await uow.repos.release.get_many_by(**{Release.DISPLAY_NAME: parsed_release.name})

        assert len(releases) == 1
        release = releases[0]
        _validate_release(release=release, parsed_release=parsed_release)
    # --------- VALIDATE DB: release character ---------
    async with uow_factory.create() as uow:
        r_cha_list = await uow.repos.release_character.get_all(order_spec=OrderSpec(
            field=ReleaseCharacter.CREATED_AT,
            direction=DatabaseOrderByTypes.ASC
        ))
        assert len(r_cha_list) == len(parsed_release.characters_raw) # 1 character
        _validate_release_character(
            parsed_release=parsed_release,
            release_character=r_cha_list[0],
            character_id=character.id,
            position=1,
            role_type_id=await uow.repos.character_role.get_id_by(name=CharacterRoleType.MAIN),
            is_uniq=True
        )
    # --------- VALIDATE DB: release series ------------
    async with uow_factory.create() as uow:
        r_series = await uow.repos.release_series_link.get_many_by(**{ReleaseSeriesLink.RELEASE_ID: release.id})
        assert len(r_series) == len(parsed_release.series_raw) # 0
    # --------- VALIDATE DB: release types -------------
    async with uow_factory.create() as uow:
        r_type_links = await uow.repos.release_type_link.get_many_by(**{ReleaseTypeLink.RELEASE_ID: release.id})
        assert len(r_type_links) == 3  # single-pack, standard tier, doll

        tier_type_id = await uow.repos.release_type.get_id_by(**{ReleaseType.NAME: ReleaseTypeTierType.STANDARD})
        pack_type_id = await uow.repos.release_type.get_id_by(**{ReleaseType.NAME: ReleaseTypePackCountType.SINGLE_PACK})
        content_type_doll_id = await uow.repos.release_type.get_id_by(**{ReleaseType.NAME: ReleaseTypeContentType.DOLL_FIGURE})

    _validate_release_type_links(
        release_type_links=r_type_links,
        tier_type_id=tier_type_id,
        pack_type_ids=[pack_type_id],
        content_type_ids=[content_type_doll_id]
    )
    # --------- VALIDATE DB: release exclusive ---------
    async with uow_factory.create() as uow:
        release_exclusives = await uow.repos.release_exclusive_link.get_all()
        assert len(release_exclusives) == len(parsed_release.exclusive_vendor_raw)
    # --------- VALIDATE DB: release pets --------------
    async with uow_factory.create() as uow:
        release_pets = await uow.repos.release_pet.get_all()
        assert len(release_pets) == len(parsed_release.pet_names_raw)
    # --------- VALIDATE DB: release images ------------
    async with uow_factory.create() as uow:
        release_images = await uow.repos.release_image.get_all()
        _validate_release_images(
            parsed_release=parsed_release,
            release_images=release_images,
            release_id=release.id,
        )
    # --------- VALIDATE DB: release reissue -----------
    async with uow_factory.create() as uow:
        reissue_links = await uow.repos.release_relation_link.get_all()
        assert len(reissue_links) == len(parsed_release.reissue_of_raw)



# =============== VALIDATION HELPERS ===============
def _validate_release(
        parsed_release: ParsedRelease,
        release: Release,
):
    assert release.name             == NameFormatter.format_name(parsed_release.name)
    assert release.display_name     == parsed_release.name
    assert release.description      == parsed_release.description_raw
    assert release.mpn              == parsed_release.mpn
    assert release.year             == parsed_release.year
    assert release.text_from_box    == parsed_release.from_the_box_text_raw

def _validate_release_character(
        parsed_release: ParsedRelease,
        release_character: ReleaseCharacter,
        character_id: int,
        role_type_id: int,
        position: int,
        is_uniq: bool
):
    assert release_character.name               == NameFormatter.format_name(parsed_release.characters_raw[position - 1])
    assert release_character.display_name       == parsed_release.characters_raw[position - 1]
    assert release_character.character_id       == character_id
    assert release_character.role_id            == role_type_id
    assert release_character.position           == position
    assert release_character.is_uniq_to_release == is_uniq

def _validate_release_series(
        release_id: int,
        series_id: int,
        release_series_link: ReleaseSeriesLink,
):
    assert release_series_link.release_id == release_id
    assert release_series_link.series_id == series_id
    assert release_series_link.relation_type == SeriesRelationTypes.PRIMARY


def _validate_release_type_links(
        release_type_links: list[ReleaseTypeLink],
        tier_type_id: int,
        pack_type_ids: list[int],
        content_type_ids: list[int]
):
    assert any(release_type_link.type_id == tier_type_id for release_type_link in release_type_links)

    for i in range(len(pack_type_ids)):
        assert any(release_type_link.type_id == pack_type_ids[i]    for release_type_link in release_type_links)

    for i in range(len(content_type_ids)):
        assert any(release_type_link.type_id == content_type_ids[i] for release_type_link in release_type_links)

def _validate_release_exclusive(
        parsed_release: ParsedRelease,
        release_exclusive: ReleaseExclusiveLink,
):
    ...

def _validate_release_pet(
        parsed_release: ParsedRelease,
        release_pet: ReleasePet,
        pet_id: int,
        position: int,
        is_uniq: bool,

):
    assert release_pet.name == NameFormatter.format_name(parsed_release.pet_names_raw[position-1])
    assert release_pet.display_name == parsed_release.pet_names_raw[position-1]
    assert release_pet.pet_id == pet_id
    assert release_pet.position == position
    assert release_pet.is_uniq_to_release == is_uniq


def _validate_release_images(
        parsed_release: ParsedRelease,
        release_id: int,
        release_images: list[ReleaseImage],
):
    assert len(release_images) == len(parsed_release.images) + 1  # + primary image

    primary_image_found = False
    for img in release_images:
        if img.image_url == parsed_release.primary_image:
            primary_image_found = True
            assert img.is_primary is True
            assert img.release_id == release_id
        else:
            assert img.is_primary is False
            assert img.release_id == release_id

    assert primary_image_found is True


def _validate_release_reissue(
        release_id: int,
        related_release_id: int,
        release_relation_type_id: int,
        reissue_link: ReleaseRelationLink,
):
    assert reissue_link.release_id == release_id
    assert reissue_link.related_release_id == related_release_id
    assert reissue_link.relation_type_id == release_relation_type_id

"""
-------------- EXTRA HELP CONTENT --------------


Comment sections
# --------- Arrange: get seeded data ---------------
# --------- Execute --------------------------------
# --------- VALIDATE DB: release -------------------
# --------- VALIDATE DB: release character ---------
# --------- VALIDATE DB: release series ------------
# --------- VALIDATE DB: release types -------------
# --------- VALIDATE DB: release exclusive ---------
# --------- VALIDATE DB: release pets --------------
# --------- VALIDATE DB: release images ------------
# --------- VALIDATE DB: release reissue -----------









"""