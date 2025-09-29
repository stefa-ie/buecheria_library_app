from datetime import datetime
from pydantic import BaseModel
from typing import Optional

# Pydantic model for response
class MemberResponse(BaseModel):
    MemberID: int
    LastName: str
    FirstName: str
    Address: str
    Email: str
    Phone: str
    BirthDate: datetime
    JoinDate: datetime
    MembershipStatus: str

    class Config:
        from_attributes = True


# Pydantic model for creating a new member
class MemberCreate(BaseModel):
    LastName: str
    FirstName: str
    Address: str
    Email: str
    Phone: str
    BirthDate: datetime
    JoinDate: datetime
    MembershipStatus: str


# Pydantic model for updating existing member
class MemberUpdate(BaseModel):
    LastName: Optional[str] = None
    FirstName: Optional[str] = None
    Address: Optional[str] = None
    Email: Optional[str] = None
    Phone: Optional[str] = None
    BirthDate: Optional[datetime] = None
    JoinDate: Optional[datetime] = None
    MembershipStatus: Optional[str] = None

