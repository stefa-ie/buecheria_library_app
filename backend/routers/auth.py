from fastapi import APIRouter, HTTPException, status, Depends
from sqlalchemy.orm import Session
from schemas.auth import LoginRequest, TokenResponse
from auth import create_access_token
from dependencies import get_current_user, get_current_admin
from database.database import get_db
from models.user import User
from datetime import timedelta

router = APIRouter()


@router.post("/login", response_model=TokenResponse)
def login(login_data: LoginRequest, db: Session = Depends(get_db)):
    """Login endpoint that returns JWT token. Users are stored in the `users` table."""
    try:
        username = login_data.username
        password = login_data.password

        user = db.query(User).filter(User.Username == username).first()
        if not user or user.Password != password:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Incorrect username or password",
                headers={"WWW-Authenticate": "Bearer"},
            )

        access_token_expires = timedelta(minutes=30)
        access_token = create_access_token(
            data={"sub": username, "role": user.Role},
            expires_delta=access_token_expires
        )

        return TokenResponse(
            access_token=access_token,
            token_type="bearer",
            username=username,
            role=user.Role
        )
    except HTTPException:
        # Re-raise HTTP exceptions (like 401)
        raise
    except Exception as e:
        # Log unexpected errors and return 500
        import traceback
        print(f"Login error: {str(e)}")
        print(traceback.format_exc())
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Internal server error: {str(e)}"
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

