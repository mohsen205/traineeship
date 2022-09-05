from fastapi import APIRouter, Depends, status, HTTPException, Response
from sqlalchemy import outerjoin, and_
from sqlalchemy.orm import Session
from dependencies import get_db
import schemas
import models
from typing import List
from util import oauth2

router = APIRouter(
    prefix="/watchlist",
    tags=["watchlist"],
    dependencies=[
        Depends(get_db),
        Depends(oauth2.get_current_user)
    ]
)
# get all equitys from watchlist


@router.get('/', status_code=status.HTTP_200_OK, response_model=List[schemas.WatchListShow])
def get_all_equitys(db: Session = router.dependencies[0],
                    current_user: int = router.dependencies[1]):
    equities = db.query(models.WatchList.id,
                        models.WatchList.company_name,
                        models.WatchList.exch_desc,
                        models.WatchList.symbol,
                        models.WatchList.collection_id,
                        models.Collection.title).join(models.Collection,
                                                      models.Collection.id == models.WatchList.collection_id).filter(
        models.WatchList.user_id == current_user.id).all()
    return equities

# get watchlist by symbol


@router.get('/{symbol}', status_code=status.HTTP_200_OK, response_model=List[schemas.WatchListShow])
def get_all_equitys(db: Session = router.dependencies[0],
                    current_user: int = router.dependencies[1], symbol: str = ""):
    # equitys = db.query(models.WatchList).filter(
    #     models.WatchList.user_id == current_user.id).all()
    equities = db.query(models.WatchList.id,
                        models.WatchList.company_name,
                        models.WatchList.exch_desc,
                        models.WatchList.symbol,
                        models.WatchList.collection_id,
                        models.Collection.title).join(models.Collection,
                                                      models.Collection.id == models.WatchList.collection_id).filter(and_(
                                                          models.WatchList.user_id == current_user.id, models.WatchList.symbol == symbol)).all()
    return equities


# add an equity to watchlist


@router.post('/create', status_code=status.HTTP_201_CREATED)
def add_equity_to_watchlist(request: schemas.WatchList, db: Session = router.dependencies[0],
                            current_user: int = router.dependencies[1]):

    equities = db.query(models.WatchList).filter(and_(
        models.WatchList.symbol == request.symbol, models.WatchList.user_id == current_user.id,
        models.WatchList.collection_id == request.collection_id)).all()

    if equities:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN,
                            detail="This Comanpy is already is already exists")
    elif not equities:
        new_equity = models.WatchList(
            symbol=request.symbol,
            exch_desc=request.exch_desc,
            company_name=request.company_name,
            user_id=current_user.id,
            collection_id=request.collection_id
        )
        db.add(new_equity)
        db.commit()
        db.refresh(new_equity)
    return {"ok": True}

# delete an equity from the watchlist


@router.post('/delete', status_code=status.HTTP_201_CREATED)
def remove_equity_from_watchlist(request: schemas.WatchList, db: Session = router.dependencies[0],
                                 current_user: int = router.dependencies[1]):
    equity = db.query(models.WatchList).filter(and_(
        models.WatchList.symbol == request.symbol, models.WatchList.user_id == current_user.id,
        models.WatchList.collection_id == request.collection_id)).all()
    if equity is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"equity does not exist")

    db.query(models.WatchList).filter(and_(
        models.WatchList.symbol == request.symbol, models.WatchList.user_id == current_user.id,
        models.WatchList.collection_id == request.collection_id)).delete(synchronize_session=False)
    db.commit()
    return {"ok": True}
