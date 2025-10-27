from app.container import Repositories
from infrastructure.repositories_impl.parsed_pets_repository_impl import ParsedPetsRepositoryImpl


def build_repositories() -> Repositories:
    return Repositories(
        parsed_pets=ParsedPetsRepositoryImpl(),
        parsed_characters=ParsedPetsRepositoryImpl()
    )


