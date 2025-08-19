from abc import abstractmethod, ABC

from domain.entities.user import UserRegistration, UserBaseInfo


class UsersRepository(ABC):
    @abstractmethod
    async def set_user(self, user: UserRegistration)-> int:
        """
        Register new user

        :return: user id
        :rtype: int
        """
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
    async def update_refresh_token(self, user_id: int, new_refresh_token: str) -> None:
        pass

    @abstractmethod
    async def login(self, email: str, password: str) -> UserBaseInfo | None:
        pass

    @abstractmethod
    async def check_user_exist(self, username: str = None, email: str = None) -> bool:
        """
        Function can check if a user with the same username or with the same email already exists in db
        Can be provided only 1 or 2 parameters at the same time

        :return: If user exists return True, if user does not exist return False
        :rtype: bool
        """
        pass