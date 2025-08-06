from application.repositories.refresh_tokens_repository import RefreshTokensRepository


class RefreshTokensProviderUseCase:
    def __init__(self, refresh_tokens_repository: RefreshTokensRepository):
        self.refresh_tokens_repository = refresh_tokens_repository

    async def set_token(self, user_id: int, token: str, ip: str) -> None:
        await self.refresh_tokens_repository.set_token(user_id=user_id, refresh_token=token, ip=ip)

    async def delete_token(self, token: str) -> None:
        await self.refresh_tokens_repository.delete_token(refresh_token=token)

    async def get_all_tokens(self, user_id: int) -> list[dict]:
        return await self.refresh_tokens_repository.get_all_tokens(user_id=user_id)

    async def validate_token(self, token: str) -> bool:
        return await self.refresh_tokens_repository.validate_token(refresh_token=token)