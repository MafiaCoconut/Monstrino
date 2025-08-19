from app.container import Repositories
from infrastructure.repositories_impl.refresh_token_repository_impl import RefreshTokensRepositoryImpl
from infrastructure.repositories_impl.users_repository_impl import UsersRepositoryImpl


# users_repository = UsersRepositoryImpl()
# refresh_tokens_repository = RefreshTokensRepositoryImpl()

def build_repositories() -> Repositories:
    return Repositories(
        users=UsersRepositoryImpl(),
        refresh_tokens=RefreshTokensRepositoryImpl(),
    )