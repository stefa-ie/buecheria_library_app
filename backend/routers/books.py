from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from backend.database import get_db
from backend.models.book import Book
from backend.schemas.book import BookResponse, BookCreate, BookUpdate

router = APIRouter()

@router.get("/books", response_model=List[BookResponse])
# Endpoint to read all books
def read_books(db: Session = Depends(get_db)):
    books = db.query(Book).all()
    return books


@router.get("/books/{book_id}", response_model=BookResponse)
# Endpoint to read specific book by ID
def read_book(book_id: int, db: Session = Depends(get_db)):
    book = db.query(Book).filter(Book.BookID == book_id).first()
    if book is None:
        raise HTTPException(status_code=404, detail="Book not found")
    return book


@router.post("/books", response_model=BookResponse)
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


@router.put("/books/{book_id}", response_model=BookResponse)
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


@router.delete("/books/{book_id}", response_model=BookResponse)
# Endpoint to delete a book
def delete_book(book_id: int, db: Session = Depends(get_db)):
    db_book = db.query(Book).filter(Book.BookID == book_id).first()
    if db_book is None:
        raise HTTPException(status_code=404, detail="Book not found")

    db.delete(db_book)
    db.commit()
    return db_book


