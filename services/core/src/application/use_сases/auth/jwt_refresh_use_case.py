from application.use_сases.auth.jwt_use_case import JwtUseCase


class JwtRefreshUseCase:
    def __init__(self,
                 jwt_use_case: JwtUseCase
                 ):
        self.jwt_use_case = jwt_use_case

    async def refresh(self, access_token: str | None = None, refresh_token: str | None = None) -> dict:
        if access_token:
            if await self.jwt_use_case.check_access_token(access_token=access_token):
                return {"code": 200, "message": "Access token is valid"}
            else:
                return await self.handle_refresh_token(refresh_token=refresh_token)
        else:
            return await self.handle_refresh_token(refresh_token=refresh_token)


    async def handle_refresh_token(self, refresh_token: str | None = None) -> dict:
        if refresh_token:
            if await self.jwt_use_case.check_refresh_token(refresh_token=refresh_token):
                tokens = await self.jwt_use_case.regenerate_tokens_by_refresh_token(refresh_token=refresh_token)
                return tokens | {"code": 200, "message": "Tokens regenerated"}
            return {"code": 401, "message": "Refresh token is invalid"}
        else:
            return {"code": 401, "message": "Refresh token is not provided"}

    async def status(self, access_token: str) -> bool:
        if await self.jwt_use_case.check_access_token(access_token=access_token):
            return True
        else:
            return False
