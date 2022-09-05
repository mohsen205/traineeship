from fastapi import File, UploadFile
from googleapiclient.http import MediaFileUpload
from util.Google import Create_Service

from config import settings

CLIENT_SECRET_FILE = settings.client_secret_file
# CLIENT_SECRET_FILE = 'client_secret_389578845827-cpb5ee4idmen9i4k33l9ppca6s865ki8.apps.googleusercontent.com.json'

API_NAME = settings.api_name
API_VERSION = settings.api_version
SCOPES = settings.scopes
FOLDER_ID = settings.folder_id

# service = Create_Service(CLIENT_SECRET_FILE, API_NAME, API_VERSION, SCOPES)
# upload image


def upload_image(file: UploadFile = File(...)):
    file_name = file.filename
    mime_type = file.content_type

    file_metadata = {
        'name': file_name,
        'parents': [FOLDER_ID],
    }

    media = MediaFileUpload(
        f"C:/Users/PC/Downloads/{file_name}", mimetype=mime_type)

    file_upload = service.files().create(
        body=file_metadata,
        media_body=media,
        fields='id'
    ).execute()

    id = file_upload.get('id')

    return f'https://drive.google.com/uc?export=view&id={id}'


# replace image


def replace_image(file: UploadFile = File(...), file_id: str = None):
    file_name = file.filename
    mime_type = file.content_type
    media = MediaFileUpload(
        f"C:/Users/PC/Downloads/{file_name}", mimetype=mime_type)
    file_upload = service.files().update(
        fileId=file_id,
        media_body=media
    ).execute()

    id = file_upload.get('id')

    return f'https://drive.google.com/uc?export=view&id={id}'
