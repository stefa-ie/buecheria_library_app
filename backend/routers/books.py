from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from backend.database.database import get_db
from backend.models.book import Book
from backend.schemas.book import BookResponse, BookCreate, BookUpdate
from backend.models.author import Author

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
    author = db.query(Author).filter(Author.AuthorID == book.AuthorID).first()
    if not author:
        raise HTTPException(status_code=400, detail="Author not found")

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

    db_book.Title = book.Title if book.Title is not None else db_book.Title
    db_book.AuthorID = book.AuthorID if book.AuthorID is not None else db_book.AuthorID
    db_book.Isbn = book.Isbn if book.Isbn is not None else db_book.Isbn
    db_book.PublicationDate = book.PublicationDate if book.PublicationDate is not None else db_book.PublicationDate
    db_book.Genre = book.Genre if book.Genre is not None else db_book.Genre

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


