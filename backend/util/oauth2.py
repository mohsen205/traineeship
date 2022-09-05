from fastapi import Depends, status, HTTPException, Query, WebSocket
from fastapi.security import OAuth2PasswordBearer
import util.JWTToken as JWTToken

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")


def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    return JWTToken.verify_token(token, credentials_exception)


async def get_token(websocket: WebSocket,
                    token: str = Query(None)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    if token is None:
        await websocket.close(code=status.WS_1008_POLICY_VIOLATION)
    return JWTToken.verify_token(token, credentials_exception)
