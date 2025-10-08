from sqlalchemy import Date
from typing import Optional
from pydantic import BaseModel
from backend.schemas.author import AuthorResponse

# Pydantic model for response
class BookResponse(BaseModel):
    BookID: int
    Title: str
    AuthorID: int
    Isbn: str
    PublicationDate: Date
    Genre: str
    author: AuthorResponse  # nested author info

    class Config:
        from_attributes = True


# Pydantic model for creating a new book
class BookCreate(BaseModel):
    Title: str
    AuthorID: int
    Isbn: str
    PublicationDate: Date
    Genre: str


# Pydantic model for updating existing book
class BookUpdate(BaseModel):
    Title: Optional[str] = None
    AuthorID: Optional[int] = None
    Isbn: Optional[str] = None
    PublicationDate: Optional[Date] = None
    Genre: Optional[str] = None

