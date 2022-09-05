from util.notification import fetch_url
import urllib.request as fetch
from routers import user, authentication as auth, collection, watchlist, private_details, alert
from database import engine
import schemas
import models
from util.sendEmail import send_email
# import cors orgin for allow api to connect with another domain
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, WebSocket


# get all subpackages router
app = FastAPI(debug=True)
# create the table inside the database
models.Base.metadata.create_all(bind=engine)

# create all origins that
origins = [
    "http://localhost",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# login router
app.include_router(auth.router)
# user router
app.include_router(user.router)
# collection router
app.include_router(collection.router)
# watchlist router
app.include_router(watchlist.router)
# private details router
app.include_router(private_details.router)
# # alert router
app.include_router(alert.router)


@app.post('/send-email')
def send_email_contact(request: schemas.Contact):
    send_email(request.email, request.subject,
               request.message, request.full_name)
    return {"ok": True}


@app.get('/')
def index():
    return {"ok": True}
