from application.repositories.users_repository import UsersRepository
from application.services.tokens_service import TokensService
from application.use_cases.db_use_case import DBUseCase
from application.use_cases.user_auth_use_case import UserAuthUseCase
from application.use_cases.user_provider_use_case import UserProviderUseCase
from domain.entities.user import UserRegistration, UserLogin, UserBaseInfo


class CoreService:
    def __init__(
            self,
            users_repository: UsersRepository,
            tokens_service: TokensService
        ):
        self.users_repository = users_repository
        self.users_provider_uc = UserProviderUseCase(
            users_repository=users_repository,
        )
        self.user_auth_uc = UserAuthUseCase(
            users_repository=users_repository
        )

        self.tokens_service = tokens_service
        self.dbUseCase = DBUseCase()
    
    async def register_new_user(self, user: UserRegistration):
        return await self.user_auth_uc.register_new_user(user=user)

    async def login(self, user: UserLogin) -> UserBaseInfo | None:
        return await self.user_auth_uc.login(user=user)

    async def restart_db(self):
        await self.dbUseCase.restartDB()

    async def change_username(self, user_id: int, new_username: str):
        await self.users_provider_uc.change_username(user_id=user_id, new_username=new_username)

    async def set_refresh_token(self, user_id: int, new_refresh_token: str, ip: str):
        await self.tokens_service.set_refresh_token(user_id=user_id, refresh_token=new_refresh_token, ip=ip)

    async def update_refresh_token(self, user_id: int, new_refresh_token: str, ip: str):
        await self.tokens_service.update_refresh_token(user_id=user_id, refresh_token=new_refresh_token, ip=ip)


    async def check_refresh_token(self, refresh_token: str) -> bool:
        return await self.tokens_service.validate_token(refresh_token=refresh_token)

