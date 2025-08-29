from datetime import datetime
from typing import Optional
from pydantic import BaseModel

# Pydantic model for response
class BookResponse(BaseModel):
    BookID: int
    Title: str
    AuthorID: int
    Isbn: str
    PublicationDate: datetime
    Genre: str

    class Config:
        orm_mode = True


# Pydantic model for creating a new book
class BookCreate(BaseModel):
    Title: str
    AuthorID: int
    Isbn: str
    PublicationDate: datetime
    Genre: str


# Pydantic model for updating existing book
class BookUpdate(BaseModel):
    Title: Optional[str] = None
    AuthorID: Optional[int] = None
    Isbn: Optional[str] = None
    PublicationDate: Optional[datetime] = None
    Genre: Optional[str] = None