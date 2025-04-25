from abc import ABC, abstractmethod

from domain.user import UserRegistration


class UsersGateway(ABC):
    @abstractmethod
    async def register_new_user(self, user: UserRegistration):
        pass

    @abstractmethod
    async def get_user_by_id(self, user_id: int):
        pass

    @abstractmethod
    async def get_user_by_username(self, username: str):
        pass

    @abstractmethod
    async def set_refresh_token(self, user_id: int, refresh_token: str) -> None:
        pass