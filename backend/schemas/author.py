from datetime import date
from typing import Optional
from pydantic import BaseModel

# Pydantic model for response
class AuthorResponse(BaseModel):
    AuthorID: int
    LastName: str
    FirstName: str
    BirthDate: date

    class Config:
        from_attributes = True


# Pydantic model for creating new author
class AuthorCreate(BaseModel):
    LastName: str
    FirstName: str
    BirthDate: date
        
        
# Pydantic model for updating existing author
class AuthorUpdate(BaseModel):
    LastName: Optional[str] = None
    FirstName: Optional[str] = None
    BirthDate: Optional[date] = None
    
    