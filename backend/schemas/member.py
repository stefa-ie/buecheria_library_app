from datetime import date
from pydantic import BaseModel, EmailStr
from typing import Optional, Literal

# Pydantic model for response
class MemberResponse(BaseModel):
    MemberID: int
    LastName: str
    FirstName: str
    Address: str
    Email: str
    Phone: str
    BirthDate: date
    JoinDate: date
    MembershipStatus: str # "Member" or "Admin"

    class Config:
        from_attributes = True


# Pydantic model for creating a new member
class MemberCreate(BaseModel):
    LastName: str
    FirstName: str
    Address: str
    Email: EmailStr
    Phone: str
    BirthDate: date
    JoinDate: date
    MembershipStatus: Literal["Member", "Admin"]


# Pydantic model for updating existing member
class MemberUpdate(BaseModel):
    LastName: Optional[str] = None
    FirstName: Optional[str] = None
    Address: Optional[str] = None
    Email: Optional[EmailStr] = None
    Phone: Optional[str] = None
    BirthDate: Optional[date] = None
    JoinDate: Optional[date] = None
    MembershipStatus: Optional[Literal["Member", "Admin"]] = None

