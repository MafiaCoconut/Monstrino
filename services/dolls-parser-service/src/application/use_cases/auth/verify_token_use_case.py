import os

from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from fastapi import Request, Response, HTTPException, status


class VerifyToken(HTTPBearer):
    def __init__(self, auto_error=True):
        super().__init__(auto_error=auto_error)

    async def __call__(self, request: Request) -> int | None:
        """
        Function check if authorization token is valid, if yes, it returns user id, if no, it returns None
        """
        creds: HTTPAuthorizationCredentials = await super().__call__(request)
        # print(f"creds: {creds}")

        if creds.scheme.lower() != 'bearer':
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Invalid auth scheme")

        try:
            if creds.credentials == os.getenv("API_TOKEN"):
                return
            else:
                raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail=f"Invalid token")
            # payload = await self.jwt_auth.decode_token(creds.credentials)
            # print(F"Result after decode token: {payload}")
        except Exception as e:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail=f"Invalid token: {e}")

        # if not payload:
        #     raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Token missing user id")

        # request.state.user_id = int(payload['sub'])