from datetime import date
from typing import Optional
from pydantic import BaseModel
from ..schemas.author import AuthorResponse, AuthorCreate

# Pydantic model for response
class BookResponse(BaseModel):
    BookID: int
    Title: Optional[str] = None
    AuthorID: Optional[int] = None
    Isbn: Optional[str] = None
    PublicationDate: Optional[date] = None
    Genre: Optional[str] = None
    Available: Optional[bool] = None
    author: Optional[AuthorResponse] = None  # optional nested author

    class Config:
        from_attributes = True


# Pydantic model for creating a new book
class BookCreate(BaseModel):
    Title: str
    AuthorID: int
    Isbn: str
    PublicationDate: date
    Genre: str
    Available: bool = True


# Pydantic model for creating a new book with optional new author
class BookCreateWithAuthor(BaseModel):
    Title: str
    AuthorID: Optional[int] = None
    Isbn: str
    PublicationDate: date
    Genre: str
    Available: bool = True
    NewAuthor: Optional[AuthorCreate] = None


# Pydantic model for updating existing book
class BookUpdate(BaseModel):
    Title: Optional[str] = None
    AuthorID: Optional[int] = None
    Isbn: Optional[str] = None
    PublicationDate: Optional[date] = None
    Genre: Optional[str] = None
    Available: Optional[bool] = None

