from datetime import datetime, UTC, timedelta
from pathlib import Path
import jwt
# from authx import AuthX, AuthXConfi

BASE_DIR = Path(__file__).parent.parent.parent
REFRESH_TOKEN_COOKIE_NAME = "refresh_token_cookie"

class AuthJWT:
    private_key_path: Path = BASE_DIR / "certs" / "jwt-private.pem"
    public_key_path: Path = BASE_DIR / "certs" / "jwt-public.pem"
    algorithm: str = "RS256"


    def encode_token(self, payload: dict) -> str:
        return jwt.encode(
            payload=payload,
            key=self.private_key_path.read_text(),
            algorithm=self.algorithm
        )

    def decode_token(self, token: str | bytes) -> dict:
        # TODO: есть ошибка которая может автоматически чекать expiren токен
        """
        self._validate_exp(payload, now, leeway)
        File "/home/coconut/Projects/Monstrino/backend/core/.venv/lib/python3.12/site-packages/jwt/api_jwt.py", line 363, in _validate_exp
            raise ExpiredSignatureError("Signature has expired")
        jwt.exceptions.ExpiredSignatureError: Signature has expired
        """

        return jwt.decode(
            jwt=token,
            key=self.public_key_path.read_text(),
            algorithms=[self.algorithm],
            audience="frontend",
            issuer="core",
        )
