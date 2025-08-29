from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from backend.database import get_db
from backend.models.book import Book
from backend.schemas.book import BookResponse, BookCreate, BookUpdate

router = APIRouter()

# Endpoint to read all books
@router.get("/books", response_model=List[BookResponse])
def read_books(db: Session = Depends(get_db)):
    books = db.query(Book).all()
    return books


# Endpoint to read specific book by ID
@router.get("/books/{book_id}", response_model=BookResponse)
def read_book(book_id: int, db: Session = Depends(get_db)):
    book = db.query(Book).filter(Book.BookID == book_id).first()
    if book is None:
        raise HTTPException(status_code=404, detail="Book not found")
    return book


# Endpoint to create a new book
@router.post("/books", response_model=BookResponse)
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


# Endpoint to update an existing book
@router.put("/books/{book_id}", response_model=BookResponse)
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


# Endpoint to delete a book
@router.delete("/books/{book_id}", response_model=BookResponse)
def delete_book(book_id: int, db: Session = Depends(get_db)):
    db_book = db.query(Book).filter(Book.BookID == book_id).first()
    if db_book is None:
        raise HTTPException(status_code=404, detail="Book not found")

    db.delete(db_book)
    db.commit()
    return db_book


