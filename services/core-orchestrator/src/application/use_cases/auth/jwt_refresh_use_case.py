from application.services.users_service import UsersService
from application.use_cases.auth.jwt_use_case import JwtUseCase


class JwtRefreshUseCase:
    def __init__(self,
                 jwt_use_case: JwtUseCase,
                 users_service: UsersService,
                 ):
        self.jwt_use_case = jwt_use_case
        self.users_service = users_service

    async def refresh(self, refresh_token: str) -> dict:
        if await self.validate_refresh_token(refresh_token):
            result = await self.jwt_use_case.regenerate_tokens_by_refresh_token(refresh_token=refresh_token)
            await self.users_service.update_refresh_token(user_id=result.get('payload').get('sub'), refresh_token=result.get('refresh_token'), ip="")
            response = {
                'refresh_token': result.get('refresh_token'),
                'access_token': result.get('access_token'),
                "code": 200,
                "message": "Tokens regenerated"
            }
            return response
        return {"code": 401, "message": "Refresh token is invalid"}

        # return await self.handle_refresh_token(refresh_token=refresh_token)

    async def handle_refresh_token(self, refresh_token: str | None = None) -> dict:
        if refresh_token:
            if await self.jwt_use_case.is_refresh_token_expired(refresh_token=refresh_token):
                tokens = await self.jwt_use_case.regenerate_tokens_by_refresh_token(refresh_token=refresh_token)
                return tokens | {"code": 200, "message": "Tokens regenerated"}
            return {"code": 401, "message": "Refresh token is invalid"}
        else:
            return {"code": 401, "message": "Refresh token is not provided"}

    async def status(self, access_token: str) -> bool:
        if await self.jwt_use_case.is_access_token_expired(access_token=access_token):
            return True
        else:
            return False

    async def validate_refresh_token(self, refresh_token: str) -> bool | None:
        """
        If token is valid -> return True
        If token is not valid -> return False
        """
        if not await self.jwt_use_case.is_refresh_token_expired(refresh_token=refresh_token):
            if await self.users_service.check_refresh_token(refresh_token=refresh_token):
                return True
        return False