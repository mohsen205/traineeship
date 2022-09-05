from fastapi import APIRouter, Depends, status, HTTPException, File, UploadFile
from sqlalchemy.orm import Session
from dependencies import get_db
import schemas
import models
from util import hashing, oauth2
from typing import List
from util.uploadImage import upload_image, replace_image
from urllib.parse import urlparse
from urllib import parse
router = APIRouter(
    prefix='/user',
    tags=['user'],
    dependencies=[Depends(get_db)]
)
# get user public data


@router.get('/', status_code=status.HTTP_200_OK,
            response_model=List[schemas.ShowUserOnUpdate])
def get_user_public_data(db: Session = router.dependencies[0],
                         current_user: int = Depends(oauth2.get_current_user)):
    user_data = db.query(models.User).filter(
        models.User.id == current_user.id).all()
    return user_data


# create user


# , response_model=schemas.ShowUser
@router.post('/', status_code=status.HTTP_201_CREATED)
def create_user(request: schemas.User, db: Session = router.dependencies[0]):
    # get the emial form data base
    user = db.query(models.User).filter(
        models.User.email == request.email).first()
    # if the email is not exist, create it
    if not user:
        new_user = models.User(
            name=request.name,
            email=request.email,
            password=hashing.get_password_hash(request.password)
        )
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        return {"ok": True}
    # if the email is exists don't create return an error
    else:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                            detail="That email address is already in use. Please choose another.")

# update user


@router.put('/update', status_code=status.HTTP_201_CREATED, response_model=schemas.ShowUserOnUpdate)
def create_user(request: schemas.UpdateUser,
                db: Session = router.dependencies[0],
                current_user: int = Depends(oauth2.get_current_user)):
    update_user = db.query(models.User).filter(
        models.User.id == current_user.id)
    user = update_user.first()

    email_check = db.query(models.User).filter(
        models.User.email == request.email).first()
    if user is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail="Not authorized to perform requested action")
    if email_check and request.email == email_check.email != current_user.email:
        raise HTTPException(status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                            detail="That email address is already in use. Please choose another.")

    elif email_check and current_user.email == email_check.email:
        update_user.update(
            {
                "name": request.name,
                "facebook_username": request.facebook_username,
                "twitter_username": request.twitter_username,
                "about": request.about,
                "youtube_link": request.youtube_link,
            }, synchronize_session="evaluate")
        db.commit()
    else:
        update_user.update(
            {
                "name": request.name,
                "email": request.email,
                "facebook_username": request.facebook_username,
                "twitter_username": request.twitter_username,
                "about": request.about,
                "youtube_link": request.youtube_link,
            }, synchronize_session="evaluate")
        db.commit()
    after_update_user = db.query(models.User).filter(
        models.User.id == current_user.id).first()
    return after_update_user

# update user Image


@router.put('/update-image', status_code=status.HTTP_201_CREATED)
def create_user(file: UploadFile = File(...),
                db: Session = router.dependencies[0],
                current_user: int = Depends(oauth2.get_current_user),
                ):
    update_user = db.query(models.User).filter(
        models.User.id == current_user.id)
    user = update_user.first()
    if user is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail="Not authorized to perform requested action")

    if user.image is None:
        path = upload_image(file)
        update_user.update({
            "image": path
        })
        db.commit()
        return path
    else:
        domain = urlparse(user.image).netloc
        if domain == "drive.google.com":
            id = dict(parse.parse_qsl(urlparse(user.image).query))["id"]
            path = replace_image(file, id)
            return path
        else:
            path = upload_image(file)
            update_user.update({
                "image": path
            })
            db.commit()
            return path

# update cover image


@router.put('/update-cover-image', status_code=status.HTTP_201_CREATED)
def create_user(file: UploadFile = File(...),
                db: Session = router.dependencies[0],
                current_user: int = Depends(oauth2.get_current_user),
                ):
    update_user = db.query(models.User).filter(
        models.User.id == current_user.id)
    user = update_user.first()
    if user is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail="Not authorized to perform requested action")

    if user.bg_profile is None:
        path = upload_image(file)
        update_user.update({
            "bg_profile": path
        })
        db.commit()
        return path
    else:
        id = dict(parse.parse_qsl(urlparse(user.bg_profile).query))["id"]
        path = replace_image(file, id)
        return path

#  delete account


@router.post('/delete-account', status_code=status.HTTP_200_OK)
def delete_account(request: schemas.DeteleProfile,
                   db: Session = router.dependencies[0],
                   current_user: int = Depends(oauth2.get_current_user)):

    delete_user = db.query(models.User).filter(
        models.User.id == current_user.id)

    user = delete_user.first()
    if user is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail="Not authorized to perform requested action")

    if user.password != '':
        if not hashing.verify_password(user.password, request.password) and user.password != '':
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN,
                                detail="Invalid Creadentials")

    new_feedback = models.Feedback(
        reason=request.reason,
        message=request.message,
    )
    db.add(new_feedback)
    db.commit()
    db.refresh(new_feedback)

    delete_user.delete(synchronize_session='evaluate')
    db.commit()
    return {"ok": True}
