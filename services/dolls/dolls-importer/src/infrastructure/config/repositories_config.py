from app.container import Repositories
from infrastructure.repositories_impl.character_genders_repository_impl import CharacterGendersRepositoryImpl
from infrastructure.repositories_impl.parsed_images_repo import ParsedImagesRepositoryImpl
from infrastructure.repositories_impl.pets_repository_impl import PetsRepositoryImpl
from infrastructure.repositories_impl.reference.image_reference_origin_repository_impl import \
    ImageReferenceOriginRepositoryImpl
from infrastructure.repositories_impl.release_series_repository_impl import ReleaseSeriesRepositoryImpl
from infrastructure.repositories_impl.source.parsed_characters_repository_impl import ParsedCharactersRepositoryImpl
from infrastructure.repositories_impl.source.parsed_pets_repository_impl import ParsedPetsRepositoryImpl
from infrastructure.repositories_impl.source.parsed_releases_repository_impl import ParsedReleasesRepositoryImpl
from infrastructure.repositories_impl.source.parsed_series_repository_impl import ParsedSeriesRepositoryImpl
from infrastructure.repositories_impl.release_images_repository_impl import ReleaseImagesRepositoryImpl
from infrastructure.repositories_impl.releae_relations_repository_impl import ReleaseRelationsRepositoryImpl
from infrastructure.repositories_impl.dolls_releases_repository_impl import DollsReleasesRepositoryImpl
from infrastructure.repositories_impl.dolls_series_repository_impl import DollsSeriesRepositoryImpl
from infrastructure.repositories_impl.dolls_types_repository_impl import DollsTypesRepositoryImpl
from infrastructure.repositories_impl.characters_repository_impl import CharactersRepositoryImpl
from infrastructure.repositories_impl.release_characters_repository_impl import ReleaseCharactersRepositoryImpl


def build_repositories() -> Repositories:
    return Repositories(
        character_genders=CharacterGendersRepositoryImpl(),
        characters=CharactersRepositoryImpl(),
        pets=PetsRepositoryImpl(),

        dolls_releases=DollsReleasesRepositoryImpl(),
        release_images=ReleaseImagesRepositoryImpl(),
        release_relations=ReleaseRelationsRepositoryImpl(),
        dolls_series=DollsSeriesRepositoryImpl(),
        dolls_types=DollsTypesRepositoryImpl(),
        release_characters=ReleaseCharactersRepositoryImpl(),
        release_series=ReleaseSeriesRepositoryImpl(),

        parsed_images=ParsedImagesRepositoryImpl(),
        image_reference_origin=ImageReferenceOriginRepositoryImpl(),

        parsed_characters=ParsedCharactersRepositoryImpl(),
        parsed_pets=ParsedPetsRepositoryImpl(),
        parsed_series=ParsedSeriesRepositoryImpl(),
        parsed_releases=ParsedReleasesRepositoryImpl(),
    )