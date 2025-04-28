from datetime import datetime, UTC, timedelta
from authx import AuthX, AuthXConfig

config = AuthXConfig(
JWT_SECRET_KEY = "supersecret123",
JWT_ALGORITHM = "HS256",
JWT_ACCESS_COOKIE_NAME = "my_access_token",
JWT_TOKEN_LOCATION = ["cookies"],
JWT_ACCESS_TOKEN_EXPIRES = timedelta(minutes=15),
JWT_REFRESH_TOKEN_EXPIRES = timedelta(days=20),
JWT_DECODE_AUDIENCE = "frontend",
JWT_DECODE_ISSUER = "backend_core",
JWT_ENCODE_AUDIENCE = "frontend",
JWT_ENCODE_ISSUER = "backend_core",
)

auth = AuthX(config=config)