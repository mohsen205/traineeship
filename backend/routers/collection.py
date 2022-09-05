from fastapi import APIRouter, Depends, status, HTTPException, Response
from sqlalchemy.orm import Session
from dependencies import get_db
import schemas
import models
from typing import List
from util import oauth2

router = APIRouter(
    prefix="/collection",
    tags=["collection"],
    dependencies=[
        Depends(get_db),
        Depends(oauth2.get_current_user)
    ]
)
# get all collections


@router.get('/', status_code=status.HTTP_200_OK,
            response_model=List[schemas.CollectionShow])
def get_all_collections(db: Session = router.dependencies[0],
                        current_user: int = Depends(oauth2.get_current_user)):
    collections = db.query(models.Collection).filter(
        models.Collection.user_id == current_user.id).all()

    return collections


# create a collection


@router.post('/create', status_code=status.HTTP_201_CREATED)
def create_collection(request: schemas.Collection, db: Session = router.dependencies[0],
                      current_user: int = router.dependencies[1]):

    collection = db.query(models.Collection).filter(
        models.Collection.title == request.title).first()
    if not collection:
        new_collection = models.Collection(
            title=request.title,
            discription=request.discription,
            user_id=current_user.id
        )
        db.add(new_collection)
        db.commit()
    else:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN,
                            detail="This Collection is already exists")
    return {"ok" : True}

# delete the collection


@router.delete('/delete/{id}')
def detele_collection(id: int, db: Session = router.dependencies[0],
                      current_user: int = router.dependencies[1]):
    collection = db.query(models.Collection).filter(
        models.Collection.id == id).first()
    if collection is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Collection with id: {id} does not exist")
    if collection.user_id != current_user.id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN,
                            detail="Not authorized to perform requested action")
    db.query(models.Collection).filter(
        models.Collection.id == id).delete(synchronize_session=False)
    db.commit()
    return Response(status_code=status.HTTP_204_NO_CONTENT)

# update collection


@router.put('/update/{id}', status_code=status.HTTP_202_ACCEPTED, response_model=schemas.CollectionShow)
def detele_collection(id: int, request: schemas.Collection, db: Session = router.dependencies[0],
                      current_user: int = router.dependencies[1]):
    update_collection = db.query(models.Collection).filter(
        models.Collection.id == id)
    collection = update_collection.first()
    if collection is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Collection with id: {id} does not exist")

    if collection.user_id != current_user.id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN,
                            detail="Not authorized to perform requested action")

    if collection.title == request.title:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN,
                            detail="This Collection is already exists")

    update_collection.update(
        {
            "title": request.title,
            "discription": request.discription
        }, synchronize_session="evaluate")
    db.commit()
    after_update_collection = db.query(models.Collection).filter(
        models.Collection.id == id).first()
    return after_update_collection
