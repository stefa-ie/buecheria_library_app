from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel
from database import Base, engine, get_db
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship

app = FastAPI()

class Book(Base):
    __tablename__ = "books"

    BookID = Column(Integer, primary_key=True, unique=True, index=True)
    Title = Column(String, index=True)
    AuthorID = Column(Integer, ForeignKey("authors.AuthorID"), index=True)
    Isbn = Column(String, unique=True, index=True)
    PublicationDate = Column(DateTime, index=True)
    Genre = Column(String, index=True)

    # Book belongs to one Author
    author = relationship("Author", back_populates="books")


# Create database tables
Base.metadata.create_all(bind=engine)


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


@app.get("/books", response_model=List[BookResponse])
# Endpoint to read all books
def read_books(db: Session = Depends(get_db)):
    books = db.query(Book).all()
    return books


@app.get("/books/{book_id}", response_model=BookResponse)
# Endpoint to read specific book by ID
def read_book(book_id: int, db: Session = Depends(get_db)):
    book = db.query(Book).filter(Book.BookID == book_id).first()
    if book is None:
        raise HTTPException(status_code=404, detail="Book not found")
    return book


# Pydantic model for creating a new book
class BookCreate(BaseModel):
    Title: str
    AuthorID: int
    Isbn: str
    PublicationDate: datetime
    Genre: str


@app.post("/books", response_model=BookResponse)
# Endpoint to create a new book
def create_book(book: BookCreate, db: Session = Depends(get_db)):
    db_book = Book(
        Title=book.Title,
        AuthorID=book.AuthorID,
        Isbn=book.Isbn,
        PublicationDate=book.PublicationDate,
        Genre=book.Genre
    )

    db.add(db_book)
    db.commit()
    db.refresh(db_book)
    return db_book


# Pydantic model for updating existing book
class BookUpdate(BaseModel):
    Title: Optional[str] = None
    AuthorID: Optional[int] = None
    Isbn: Optional[str] = None
    PublicationDate: Optional[datetime] = None
    Genre: Optional[str] = None


@app.put("/books/{book_id}", response_model=BookResponse)
# Endpoint to update an existing book
def update_book(book_id: int, book: BookUpdate, db: Session = Depends(get_db)):
    db_book = db.query(Book).filter(Book.BookID == book_id).first()
    if db_book is None:
        raise HTTPException(status_code=404, detail="Book not found")

    db_book.Title = book.Title
    db_book.AuthorID = book.AuthorID
    db_book.Isbn = book.Isbn
    db_book.PublicationDate = book.PublicationDate
    db_book.Genre = book.Genre

    db.commit()
    db.refresh(db_book)
    return db_book


@app.delete("/books/{book_id}", response_model=BookResponse)
# Endpoint to delete a book
def delete_book(book_id: int, db: Session = Depends(get_db)):
    db_book = db.query(Book).filter(Book.BookID == book_id).first()
    if db_book is None:
        raise HTTPException(status_code=404, detail="Book not found")

    db.delete(db_book)
    db.commit()
    return db_book


