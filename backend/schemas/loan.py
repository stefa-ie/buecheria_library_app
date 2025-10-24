from datetime import date
from pydantic import BaseModel
from typing import Optional

# Pydantic model for response
class LoanResponse(BaseModel):
    LoanID: int
    MemberID: int
    BookID: int
    LoanDate: date
    DueDate: date
    ReturnDate: Optional[date] = None

    class Config:
        from_attributes = True

    
# Pydantic model for creating a new loan
class LoanCreate(BaseModel):
    MemberID: int
    BookID: int
    LoanDate: date
    DueDate: date
    ReturnDate: Optional[date] = None


# Pydantic model for updating existing loan
class LoanUpdate(BaseModel):
    MemberID: Optional[int] = None
    BookID: Optional[int] = None
    LoanDate: Optional[date] = None
    DueDate: Optional[date] = None
    ReturnDate: Optional[date] = None

