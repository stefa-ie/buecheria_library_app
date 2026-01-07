from fastapi import APIRouter, HTTPException, status, Depends
from schemas.auth import LoginRequest, TokenResponse
from auth import create_access_token
from dependencies import get_current_user, get_current_admin
from datetime import timedelta

router = APIRouter()

# Simple user database (in production, use actual database)
# For now, we'll use hardcoded admin user
USERS_DB = {
    "admin": {
        "password": "adminpassword",
        "role": "admin"
    }
}

@router.post("/login", response_model=TokenResponse)
def login(login_data: LoginRequest):
    """Login endpoint that returns JWT token"""
    username = login_data.username
    password = login_data.password
    
    # Check if user exists and password is correct
    user = USERS_DB.get(username)
    if not user or user["password"] != password:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # Create access token
    access_token_expires = timedelta(minutes=30)
    access_token = create_access_token(
        data={"sub": username, "role": user["role"]},
        expires_delta=access_token_expires
    )
    
    return TokenResponse(
        access_token=access_token,
        token_type="bearer",
        username=username,
        role=user["role"]
    )

@router.get("/protected")
def protected_route(current_user: dict = Depends(get_current_user)):
    """Example protected route - requires authentication"""
    return {
        "message": f"Hello {current_user['username']}, you are logged in and can access this route.",
        "user": current_user
    }

@router.get("/adminonly")
def admin_only_route(current_user: dict = Depends(get_current_admin)):
    """Admin-only route - requires admin role"""
    return {
        "message": "Welcome, admin. This is an admin-only endpoint.",
        "user": current_user
    }

