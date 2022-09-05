from fastapi import APIRouter, Depends, status, HTTPException, Response
from sqlalchemy.orm import Session
from dependencies import get_db
import schemas
import models
from typing import List
from util import oauth2

router = APIRouter(
    prefix="/private-details",
    tags=["privateDetails"],
    dependencies=[
        Depends(get_db),
        Depends(oauth2.get_current_user)
    ]
)


# get private details from

@router.get('/', status_code=status.HTTP_200_OK, response_model=schemas.ShwoPrivateDetails)
def get_private_details(db: Session = router.dependencies[0],
                        current_user: int = router.dependencies[1]):
    user_private_data = db.query(models.PriavteDetail).filter(
        models.PriavteDetail.user_id == current_user.id).first()
    return user_private_data


# add detials


@router.post('/create', status_code=status.HTTP_201_CREATED, response_model=schemas.ShwoPrivateDetails)
def create_collection(request: schemas.PriavteDetails, db: Session = router.dependencies[0],
                      current_user: int = router.dependencies[1]):
    private_details_update = db.query(models.PriavteDetail).filter(
        models.PriavteDetail.user_id == current_user.id)
    private_details = private_details_update.first()
    if private_details is None:
        new_private_details = models.PriavteDetail(
            first_name=request.first_name,
            last_name=request.last_name,
            phone=request.phone,
            yearBrith=request.yearBrith,
            country=request.country,
            city=request.city,
            stateRegion=request.stateRegion,
            zipCode=request.zipCode,
            company=request.company,
            taxpayId=request.taxpayId,
            user_id=current_user.id
        )
        db.add(new_private_details)
        db.commit()
        db.refresh(new_private_details)
        return new_private_details
    else:
        private_details_update.update(
            {
                "first_name": request.first_name,
                "last_name": request.last_name,
                "phone": request.phone,
                "yearBrith": request.yearBrith,
                "country": request.country,
                "city": request.city,
                "stateRegion": request.stateRegion,
                "zipCode": request.zipCode,
                "company": request.company,
                "taxpayId": request.taxpayId,
            }
        )
        db.commit()
        after_update_private_details = db.query(models.PriavteDetail).filter(
            models.PriavteDetail.user_id == current_user.id).first()
        return after_update_private_details
