from app.container import Repositories
from infrastructure.repositories_impl.parsed_character_repository_impl import ParsedCharactersRepositoryImpl
from infrastructure.repositories_impl.parsed_pet_repository_impl import ParsedPetRepositoryImpl
from infrastructure.repositories_impl.parsed_release_repository_impl import ParsedReleasesRepositoryImpl
from infrastructure.repositories_impl.parsed_series_repository_impl import ParsedSeriesRepositoryImpl


def build_repositories() -> Repositories:
    return Repositories(
        parsed_pet=ParsedPetRepositoryImpl(),
        parsed_character=ParsedCharactersRepositoryImpl(),
        parsed_series=ParsedSeriesRepositoryImpl(),
        parsed_release=ParsedReleasesRepositoryImpl(),
    )
