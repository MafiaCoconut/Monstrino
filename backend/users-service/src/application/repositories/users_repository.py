from abc import abstractmethod, ABC

from domain.new_user import NewUser
from domain.user import User, UserRegistration, UserBaseInfo


class UsersRepository(ABC):
    @abstractmethod
    async def set_user(self, user: UserRegistration):
        pass

    @abstractmethod
    async def get_user(self, user_id: int):
        pass

    @abstractmethod
    async def get_user_base_info(self, user_id: int) -> UserBaseInfo:
        pass

    @abstractmethod
    async def update_username(self, user_id: int, new_username: str):
        pass

    @abstractmethod
    async def update_refresh_token(self, user_email: str, new_refresh_token: str) -> None:
        pass

    @abstractmethod
    async def is_exists(self, email: str, password: str) -> bool:
        pass