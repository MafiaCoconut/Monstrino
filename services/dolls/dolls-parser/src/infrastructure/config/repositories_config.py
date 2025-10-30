from app.container import Repositories
from infrastructure.repositories_impl.parsed_characters_repository_impl import ParsedCharactersRepositoryImpl
from infrastructure.repositories_impl.parsed_pets_repository_impl import ParsedPetsRepositoryImpl
from infrastructure.repositories_impl.parsed_releases_repository_impl import ParsedReleasesRepositoryImpl
from infrastructure.repositories_impl.parsed_series_repository_impl import ParsedSeriesRepositoryImpl


def build_repositories() -> Repositories:
    return Repositories(
        parsed_pets=ParsedPetsRepositoryImpl(),
        parsed_characters=ParsedCharactersRepositoryImpl(),
        parsed_series=ParsedSeriesRepositoryImpl(),
        parsed_releases=ParsedReleasesRepositoryImpl(),
    )


