from config import settings
import urllib


YAHOO_API_KEY = settings.yahoo_api_key


def fetch_url(symbol):
    headers = {
        'Content-Type': 'application/json',
        'X-Api-Key': YAHOO_API_KEY
    }
    full_url = f"https://yfapi.net/v6/finance/quote?region=US&lang=en&symbols={symbol}"
    try:
        req = urllib.request.Request(full_url, None, headers)
        content = urllib.request.urlopen(req)
        return content.read()
    except urllib.error.URLError as e:
        return e.reason


def check_the_price_reached(price, price_goal):
    return "Hello mohsen"
