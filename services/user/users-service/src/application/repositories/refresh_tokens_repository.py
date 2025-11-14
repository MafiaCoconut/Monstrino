from abc import ABC, abstractmethod


class RefreshTokensRepository(ABC):
    @abstractmethod
    async def set_token(self, user_id: int, refresh_token: str, ip: str = "") -> None:
        """
        Function set a refresh token
        """
        pass

    @abstractmethod
    async def update_token(self, user_id: int, refresh_token: str, ip: str = "") -> None:
        """
        Function update already exist refresh token with a new generated from him
        """
        pass

    @abstractmethod
    async def validate_token(self, refresh_token: str) -> bool:
        """
        Function check if a refresh token is valid
        Return True if token is valid, False if token is not valid
        """
        pass

    @abstractmethod
    async def delete_token(self, refresh_token: str) -> None:
        """
        Function revoke a refresh token
        """
        pass

    @abstractmethod
    async def get_all_tokens(self, user_id: int) -> list[dict]:
        """
        Function get all refresh tokens
        """
        pass
