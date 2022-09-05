from fastapi.security import OAuth2PasswordBearer
from fastapi import APIRouter, Depends, status, HTTPException
from fastapi.security.oauth2 import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from dependencies import get_db
import models
import schemas
from util import hashing, JWTToken, oauth2
from datetime import timedelta
from datetime import datetime
from util.sendEmail import reset_password_email
import secrets
router = APIRouter(
    tags=['auth'],
    dependencies=[Depends(get_db)]
)


@router.post('/login', status_code=status.HTTP_202_ACCEPTED)
#  OAuth2PasswordRequestForm = Depends()
def login(request: schemas.Auth, db: Session = router.dependencies[0]):
    # get user form data base
    user = db.query(models.User).filter(
        models.User.email == request.username).first()

    # check if there is not user return error message with status code 404
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail="User does not exists")

    # check if the password correct or not
    if not hashing.verify_password(user.password, request.password):
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN,
                            detail="Invalid Creadentials")
    # if everthing is correct generate JWT (json web token) and return
    access_token_expires = timedelta(
        minutes=JWTToken.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = JWTToken.create_access_token(
        data={
            "id": user.id,
            "name": user.name,
            "email": user.email,
            "image": user.image,
        },
        expires=access_token_expires)
    return {"access_token": access_token, "token_type": "bearer"}

# change password


@router.put('/change-password', status_code=status.HTTP_201_CREATED)
def change_password(request: schemas.ChangePassword,
                    db: Session = router.dependencies[0],
                    current_user: int = Depends(oauth2.get_current_user)):
    password_update = db.query(models.User).filter(
        models.User.id == current_user.id)

    user = password_update.first()

    if user is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail="Not authorized to perform requested action")
    if user.password != '':
        if not hashing.verify_password(user.password, request.current_password) and user.password != '':
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN,
                                detail="Invalid Creadentials")

    hashed_password = hashing.get_password_hash(request.new_password)
    password_update.update({
        "password": hashed_password
    }, synchronize_session="evaluate")

    db.commit()
    return {"ok": True}

# forget password


@router.post('/forget-password')
def forget_password(request: schemas.ForgetPassword,
                    db: Session = router.dependencies[0]):

    user = db.query(models.User).filter(
        models.User.email == request.email).first()

    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail="User does not exists")

    access_token_expires = timedelta(
        minutes=2880)

    hash = secrets.token_hex(128)

    access_token = JWTToken.create_access_token(
        data={
            "hash": hash,
            "sub": "Reset Password",
        },
        expires=access_token_expires)
    db.query(models.User).filter(
        models.User.email == request.email).update({
            "reset_token": hash
        })
    db.commit()
    reset_password_email(user.email, user.name, access_token)
    return {"ok": True}


# reset password


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/reset-password")


@router.put('/reset-password')
def reset_password(request: schemas.ResetPassword,
                   db: Session = router.dependencies[0], token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    hash = JWTToken.verify_token_reset(token, credentials_exception)
    if hash:
        user = db.query(models.User).filter(
            models.User.reset_token == hash.hash).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail="User does not exists or your link is expired please try again")

    password_update = db.query(models.User).filter(
        models.User.reset_token == hash.hash)

    hashed_password = hashing.get_password_hash(request.new_password)
    password_update.update({
        "password": hashed_password
    }, synchronize_session="evaluate")

    db.commit()
    return {"ok": True, "email": user.email}
