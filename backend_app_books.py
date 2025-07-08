from sqlalchemy import create_engine, Column, Integer, String, DateTime
from datetime import datetime
from sqlalchemy.orm import relationship, Session, sessionmaker
from sqlalchemy import ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from pydantic import BaseModel
from typing import List

from fastapi import FastAPI, Depends, HTTPException

app = FastAPI()

DATABASE_URL = "sqlite:///./buecheria.db"

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(bind=engine)
Base = declarative_base()


class Book(Base):
    __tablename__ = "books"

    BookID = Column(Integer, primary_key=True, unique=True, index=True)
    Title = Column(String, index=True)
    AuthorID = Column(Integer, ForeignKey("authors.AuthorID"), index=True)
    PublicationDate = Column(DateTime, index=True)

    # Book belongs to one Author
    author = relationship("Author", back_populates="books")

# Create database tables
Base.metadata.create_all(bind=engine)


# Dependency to get database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# Pydantic model for response
class BookResponse(BaseModel):
    BookID: int
    Title: str
    AuthorID: int
    PublicationDate: datetime

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
    PublicationDate: datetime


@app.post("/books", response_model=BookResponse)
# Endpoint to create a new book
def create_book(book: BookCreate, db: Session = Depends(get_db)):
    db_book = Book(
        Title=book.Title,
        AuthorID=book.AuthorID,
        PublicationDate=book.PublicationDate
    )
    db.add(db_book)
    db.commit()
    db.refresh(db_book)
    return db_book


@app.put("/books/{book_id}", response_model=BookResponse)
# Endpoint to update an existing book
def update_book(book_id: int, book: BookCreate, db: Session = Depends(get_db)):
    db_book = db.query(Book).filter(Book.BookID == book_id).first()
    if db_book is None:
        raise HTTPException(status_code=404, detail="Book not found")
    
    db_book.Title = book.Title
    db_book.AuthorID = book.AuthorID
    db_book.PublicationDate = book.PublicationDate
    
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

