from datetime import datetime
from pydantic import BaseModel
from typing import Optional

# Pydantic model for response
class LoanResponse(BaseModel):
    LoanID: int
    MemberID: int
    BookID: int
    LoanDate: datetime
    DueDate: datetime
    ReturnDate: datetime = None

    class Config:
        from_attributes = True

    
# Pydantic model for creating a new loan
class LoanCreate(BaseModel):
    MemberID: int
    BookID: int
    LoanDate: datetime
    DueDate: datetime
    ReturnDate: Optional[datetime] = None


# Pydantic model for updating existing loan
class LoanUpdate(BaseModel):
    MemberID: Optional[int] = None
    BookID: Optional[int] = None
    LoanDate: Optional[datetime] = None
    DueDate: Optional[datetime] = None
    ReturnDate: Optional[datetime] = None

