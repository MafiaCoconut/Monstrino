from abc import abstractmethod, ABC

from domain.user import User


class UsersRepository(ABC):
    @abstractmethod
    async def set_user(self, user: User):
        pass

    @abstractmethod
    async def get_user(self, user_id: int):
        pass

    @abstractmethod
    async def update_username(self, user_id: int, new_username: str):
        pass

    
