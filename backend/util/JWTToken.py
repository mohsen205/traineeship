from datetime import datetime, timedelta
from jose import JWTError, jwt
from typing import Optional
from schemas import TokenData, TokenReset
from config import settings

SECRET_KEY = settings.secret_key
ALGORITHM = settings.algorithm
ACCESS_TOKEN_EXPIRE_MINUTES = settings.access_token_expire_minutes

# create access token


def create_access_token(data: dict, expires: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires:
        expire = datetime.utcnow() + expires
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

#  verfiy token


def verify_token(token: str, credentials_exception):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        id: int = payload.get("id")
        name: str = payload.get("name")
        email: str = payload.get("email")
        if id is None:
            raise credentials_exception
        token_data = TokenData(id=id, name=name, email=email)
    except JWTError:
        raise credentials_exception
    return token_data

# verify token password


def verify_token_reset(token: str, credentials_exception):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        hash: str = payload.get("hash")
        if hash is None:
            raise credentials_exception

        token_data = TokenReset(hash=hash)

    except JWTError:
        raise credentials_exception
    return token_data
