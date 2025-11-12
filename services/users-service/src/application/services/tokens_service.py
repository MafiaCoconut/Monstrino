from application.repositories.refresh_token_repository import RefreshTokensRepository
from application.use_cases.refresh_token_provider_use_case import RefreshTokensProviderUseCase


class TokensService:
    def __init__(self, refresh_token_repository: RefreshTokensRepository):
        self.refresh_token_provider_uc = RefreshTokensProviderUseCase(
            refresh_token_repository=refresh_token_repository
        )

    async def set_refresh_token(self, user_id: int, refresh_token: str, ip: str):
        await self.refresh_token_provider_uc.set_token(user_id=user_id, token=refresh_token, ip=ip)

    async def update_refresh_token(self, user_id: int, refresh_token: str, ip: str):
        await self.refresh_token_provider_uc.update_token(user_id=user_id, token=refresh_token, ip=ip)

    async def delete_token(self, refresh_token: str) -> None:
        await self.refresh_token_provider_uc.delete_token(token=refresh_token)

    async def get_all_tokens(self, user_id: int) -> list[dict]:
        return await self.refresh_token_provider_uc.get_all_tokens(user_id=user_id)

    async def validate_token(self, refresh_token: str) -> bool:
        return await self.refresh_token_provider_uc.validate_token(token=refresh_token)
