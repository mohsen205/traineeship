from fastapi import APIRouter, Depends, status, WebSocket, Query
from sqlalchemy.orm import Session
from dependencies import get_db
import schemas
import models
from util import oauth2
from typing import List
from datetime import datetime
router = APIRouter(
    prefix='/alert',
    tags=['notifications'],
    dependencies=[Depends(get_db), Depends(
        oauth2.get_current_user), Depends(oauth2.get_token)]
)


#  create alert


@router.post('/add-alert', status_code=status.HTTP_200_OK)
def create_alert(request: schemas.Alert,
                 db: Session = router.dependencies[0],
                 current_user: int = router.dependencies[1]):
    initial_alert = db.query(models.Alert).filter(
        models.Alert.symbol == request.symbol, models.Alert.user_id == current_user.id)
    alert = initial_alert.first()
    if alert is None:
        first_alert = models.Alert(
            symbol=request.symbol,
            exch_desc=request.exch_desc,
            price=request.price,
            position=request.position,
            recevie=request.recevie,
            user_id=current_user.id,
        )
        db.add(first_alert)
        db.commit()
        db.refresh(first_alert)
        return first_alert
    else:
        initial_alert.update(
            {
                "price": request.price,
                "position": request.position,
                "recevie": request.recevie,
            }
        )
        db.commit()

        return {"ok": True}


# @router.websocket("/ws-notification/ws")
# async def websocket_endpoint(websocket: WebSocket,
#                              db: Session = router.dependencies[0], token: str = router.dependencies[2]):

#     await websocket.accept()
#     n = 0
#     while n < 10:

#         price_of_company = 7895.5

#         # fetch url and database and make check
#         # if True {
#         #     send notification with web json file with data
#         # }

#         await websocket.send_text(f"alerts {n}")

#         n = n + 1


# def get_all_alerts(id,db):
#     alerts = db.query(models.Alert).filter(
#         models.Alert.user_id == id).all()
#     for alert in alerts:
#         ticker = alert.symbol
#         position = alert.position
#         price = alert.price
#     return ticker, position, price

# def check_the_price_reached(price,ticker,position):
#     new_price = get_data_form_url()
#     if position == "moves below":
#                 print(price < new_price)
#             else:
#                 print(price > 1)
#     pass

# def get_data_form_url():
#     price = 500
#     return price
