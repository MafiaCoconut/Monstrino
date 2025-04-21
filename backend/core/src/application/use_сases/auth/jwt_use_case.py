from authx import AuthX, AuthXConfig

class JwtUseCase:
    def __init__(self):
        config = AuthXConfig()
        config.JWT_SECRET_KEY = ""
        config.JWT_ACCESS_COOKIE_NAME = "my_access_token"
        config.JWT_TOKEN_LOCATION = ["cookies"]

        self.security = AuthX(config=config)


    async def get_new_access_token(self, user_id: str) -> str:
        return self.security.create_access_token(
            uid=user_id
        )

    async def get_new_refresh_token(self, user_id: str) -> str:
        return self.security.create_refresh_token(
            uid=user_id
        )