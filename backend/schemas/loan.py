from datetime import date
from pydantic import BaseModel, computed_field
from typing import Optional
from schemas.book import BookResponse
from schemas.member import MemberResponse

# Pydantic model for response
class LoanResponse(BaseModel):
    LoanID: int
    MemberID: int
    BookID: int
    LoanDate: date
    DueDate: date
    ReturnDate: Optional[date] = None
    book: Optional[BookResponse] = None
    member: Optional[MemberResponse] = None

    @computed_field
    def BorrowerName(self) -> str:
        """Computed field that combines member's first and last name"""
        if self.member:
            return f"{self.member.FirstName} {self.member.LastName}"
        return ""

    @computed_field
    def Returned(self) -> bool:
        """Computed field that indicates if the loan has been returned"""
        return self.ReturnDate is not None

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

