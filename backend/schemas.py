from pydantic import BaseModel
from typing import Optional, List
from datetime import date

# # # user schemas


class User(BaseModel):
    name: str
    email: str
    password: str


class ShowUser(User):
    password: str

    class Config():
        orm_mode = True


class UpdateUser(BaseModel):
    name: str
    email: str
    facebook_username: Optional[str]
    twitter_username: Optional[str]
    youtube_link: Optional[str]
    about: Optional[str]


class ShowUserOnUpdate(BaseModel):
    name: str
    email: str
    image: Optional[str]
    bg_profile: Optional[str]
    facebook_username: Optional[str]
    twitter_username: Optional[str]
    youtube_link: Optional[str]
    about: Optional[str]

    class Config():
        orm_mode = True

    # update password


class ChangePassword(BaseModel):
    current_password: str
    new_password: str

    # Forget password


class ForgetPassword(BaseModel):
    email: str

    # Reset password


class ResetPassword(BaseModel):
    new_password: str
    confirm_password: str

    # token schemes


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    id: Optional[int] = None
    name: Optional[str] = None
    email: Optional[str] = None


class TokenReset(BaseModel):
    hash: str

# # # Private Details schemas


class PriavteDetails(BaseModel):
    first_name: Optional[str]
    last_name: Optional[str]
    phone: Optional[float]
    yearBrith: Optional[date]
    country: Optional[str]
    city: Optional[str]
    stateRegion: Optional[str]
    zipCode: Optional[int]
    company: Optional[str]
    taxpayId: Optional[float]


class ShwoPrivateDetails(PriavteDetails):
    class Config():
        orm_mode = True


# # # login schemas


class Auth(BaseModel):
    username: str
    password: str


# Collection schemas


class Collection(BaseModel):
    title: str
    discription: Optional[str]


class CollectionShow(Collection):
    id: int

    class Config():
        orm_mode = True

# watchlist schemas


class WatchList(BaseModel):
    symbol: str
    exch_desc: str
    company_name: str
    collection_id: Optional[int] = 5


class WatchListShow(WatchList):
    id: int
    title: Optional[str]

    class Config():
        orm_mode = True

# # # Alert schema


class Alert(BaseModel):
    symbol: str
    exch_desc: str
    price: float
    position: Optional[str] = "Moves above"
    recevie: Optional[bool] = True

    # Detele Profile


class DeteleProfile(BaseModel):
    password: Optional[str]
    reason: str
    message: Optional[str]

    # Send Contact Email

class Contact(BaseModel):
    full_name :str
    email : str
    subject:str
    message : str