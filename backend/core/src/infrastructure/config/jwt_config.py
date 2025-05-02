from datetime import datetime, UTC, timedelta
from pathlib import Path
import jwt
# from authx import AuthX, AuthXConfi

BASE_DIR = Path(__file__).parent.parent.parent
REFRESH_TOKE_COOKIE_NAME = "refresh_token_cookie"

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

    def decode_token(self, token: str) -> dict:
        return jwt.decode(
            jwt=token,
            key=self.public_key_path.read_text(),
            algorithms=[self.algorithm]
        )