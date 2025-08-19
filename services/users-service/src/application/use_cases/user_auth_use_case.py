import logging

from application.repositories.users_repository import UsersRepository
from application.use_cases.users_data_use_case import UsersDataUseCase
from domain.entities.user import UserLogin, UserRegistration, UserBaseInfo

logger = logging.getLogger(__name__)

class UserAuthUseCase:
    def __init__(self,
                 users_repository: UsersRepository
        ):
        self.user_repository = users_repository
        self.users_data_use_case = UsersDataUseCase(
            users_repository=users_repository
        )


    async def register_new_user(self, user: UserRegistration) -> dict:
        """
        Function check
        if user already exists in DB and if yes, it will return dictionary with key 'error' with codes 'user-with-this-username-already-exist' or/and 'user-with-this-email-already-exist'
        if user not exists in DB, it will return dictionary with key 'user' and value UserBaseInfo
        """
        result: dict = await self.validate_user_exists(user)
        if result.get('error') == "":
            result['user'] = await self.users_data_use_case.register_new_user(new_user=user)

        return result

    async def login(self, user: UserLogin) -> UserBaseInfo | None:
        return await self.user_repository.login(email=user.email, password=user.password)

    async def validate_user_exists(self, user: UserRegistration) -> dict:
        same_username = await self.user_repository.check_user_exist(username=user.username)
        same_email = await self.user_repository.check_user_exist(email=user.email)

        result = {"error": ""}
        if same_username:
            result["error"] += "user-with-this-username-already-exist/"
        if same_email:
            result["error"] += "user-with-this-email-already-exist/"
        logger.info(f'Result of validation: {result}')
        return result
