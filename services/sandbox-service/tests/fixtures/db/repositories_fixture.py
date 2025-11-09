from dataclasses import dataclass

from monstrino_models.dto import ImageImportQueue
from monstrino_repositories.repositories import *
from monstrino_repositories.repositories.users.refresh_tokens_repo import RefreshTokensRepo
from monstrino_repositories.repositories.users.users_repo import UsersRepo
from monstrino_repositories.repositories_impl import *
from monstrino_repositories.repositories_impl.users.refresh_tokens_impl import RefreshTokensRepoImpl
from monstrino_repositories.repositories_impl.users.users_repo_impl import UsersRepoImpl
from sqlalchemy.ext.asyncio import AsyncSession


@dataclass
class Repositories:
    character_genders: CharacterGendersRepo
    characters: CharactersRepo
    series: SeriesRepo
    pets: PetsRepo

    # Images
    image_reference_origin: ImageReferenceOriginRepo
    image_import_queue: ImageImportQueueRepo
    release_images: ReleaseImagesRepo

    # Parsed repositories
    parsed_characters: ParsedCharactersRepo
    parsed_series: ParsedSeriesRepo
    parsed_pets: ParsedPetsRepo
    parsed_releases: ParsedReleasesRepo
    parsed_sources: ParsedSourcesRepo
    parsed_source_types: ParsedSourceTypesRepo

    # Releases
    release_character_roles: ReleaseCharacterRolesRepo
    release_characters: ReleaseCharactersRepo
    release_exclusives: ReleaseExclusivesRepo
    release_pets: ReleasePetsRepo
    release_relation_types: ReleaseRelationTypesRepo
    release_relations: ReleaseRelationsRepo
    release_series_link: ReleaseSeriesLinkRepo
    release_types: ReleaseTypesRepo
    releases: ReleasesRepo

    # Users
    users: UsersRepo
    refresh_tokens: RefreshTokensRepo



def build_repositories(session: AsyncSession) -> Repositories:
    return Repositories(
        character_genders=CharacterGendersRepoImpy(session),
        characters=CharactersRepoImpl(session),
        pets=PetsRepoImpl(session),
        series=SeriesRepoImpl(session),

        # Images
        image_reference_origin=ImageReferenceOriginRepoImpl(session),
        image_import_queue=ImageImportQueueRepoImpl(session),
        release_images=ReleaseImagesRepoImpl(session),

        # Parsed repositories
        parsed_characters=ParsedCharactersRepoImpl(session),
        parsed_pets=ParsedPetsRepoImpl(session),
        parsed_series=ParsedSeriesRepoImpl(session),
        parsed_releases=ParsedReleasesRepoImpl(session),
        parsed_sources=ParsedSourcesRepoImpy(session),
        parsed_source_types=ParsedSourceTypesRepoImpy(session),

        # Releases
        release_character_roles=ReleaseCharacterRolesRepoImpl(session),
        release_characters=ReleaseCharactersRepoImpl(session),
        release_exclusives=ReleaseExclusivesRepoImpl(session),
        release_pets=ReleasePetsRepoImpl(session),
        release_relation_types=ReleaseRelationTypesRepoImpl(session),
        release_relations=ReleaseRelationsRepoImpl(session),
        release_series_link=ReleaseSeriesLinkRepoImpl(session),
        release_types=ReleaseTypesRepoImpl(session),
        releases=ReleasesRepoImpl(session),

        # Users
        users=UsersRepoImpl(session),
        refresh_tokens=RefreshTokensRepoImpl(session)
    )