from icecream import ic

from application.repositories.users_repository import UsersRepository
from domain.user import UserBaseInfo


class UserGetDataUseCase:
    def __init__(
            self,
            users_repository: UsersRepository
    ):
        self.users_repository = users_repository


    async def get_user_base_info(self, user_id: int) -> UserBaseInfo:
        user = await self.users_repository.get_user_base_info(user_id)
        await self.validate_datetime_values(user=user)
        return user

    @staticmethod
    async def validate_datetime_values(user):
        """
        Так как в БД формат данных для дней и времени отличается от текста, эта функция переводит даты в текст
        """
        if user.updatedAt:
            user.updatedAt = user.updatedAt.isoformat()
        if user.createdAt:
            user.createdAt = user.createdAt.isoformat()

