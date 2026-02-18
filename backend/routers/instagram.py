"""
Instagram feed endpoint using Instagram Graph API.
Requires INSTAGRAM_ACCESS_TOKEN and INSTAGRAM_USER_ID in environment.
See: https://developers.facebook.com/docs/instagram-platform/instagram-graph-api
"""
import os
import urllib.request
import urllib.error
import json
from fastapi import APIRouter

router = APIRouter()

GRAPH_API_BASE = "https://graph.instagram.com"
API_VERSION = "v21.0"


@router.get("/instagram-feed")
def get_instagram_feed():
    """
    Returns recent Instagram media for display on the website.
    Configure INSTAGRAM_ACCESS_TOKEN and INSTAGRAM_USER_ID in backend .env.
    """
    token = os.environ.get("INSTAGRAM_ACCESS_TOKEN")
    user_id = os.environ.get("INSTAGRAM_USER_ID")
    if not token or not user_id:
        return {"data": []}

    fields = "id,caption,media_url,permalink,thumbnail_url,media_type"
    url = f"{GRAPH_API_BASE}/{API_VERSION}/{user_id}/media?fields={fields}&limit=12&access_token={token}"

    try:
        req = urllib.request.Request(url)
        with urllib.request.urlopen(req, timeout=10) as resp:
            body = json.loads(resp.read().decode())
        return body
    except (urllib.error.HTTPError, urllib.error.URLError, json.JSONDecodeError):
        return {"data": []}
