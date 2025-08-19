from app.container import Repositories
from infrastructure.repositories_impl.dolls_repository_impl import DollsRepositoryImpl

def build_repositories() -> Repositories:
    return Repositories(
        dolls=DollsRepositoryImpl()
    )