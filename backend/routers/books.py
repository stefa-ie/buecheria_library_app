from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session, joinedload
from typing import List
from database.database import get_db
from models.book import Book
from schemas.book import BookResponse, BookCreateWithAuthor, BookUpdate
from models.author import Author

router = APIRouter()

# Endpoint to read all books
@router.get("/books", response_model=List[BookResponse])
def read_books(db: Session = Depends(get_db)):
    books = db.query(Book).filter(Book.AuthorID.isnot(None)).options(joinedload(Book.author)).all()
    return books


# Endpoint to read specific book by ID
@router.get("/books/{book_id}", response_model=BookResponse)
def read_book(book_id: int, db: Session = Depends(get_db)):
    book = db.query(Book).options(joinedload(Book.author)).filter(Book.BookID == book_id).first()
    if book is None:
        raise HTTPException(status_code=404, detail="Book not found")
    return book


# Endpoint to create a new book
@router.post("/books", response_model=BookResponse)
def create_book(book: BookCreateWithAuthor, db: Session = Depends(get_db)):
    # If a new author is included, create it first
    if book.NewAuthor is not None:
        new_author = Author(**book.NewAuthor.model_dump())    # formerly ".dict()" in Pydantic v2
        db.add(new_author)
        db.commit()
        db.refresh(new_author)
        book.AuthorID = new_author.AuthorID  # associate new author

    # Create the book
    db_book = Book(
        Title=book.Title,
        AuthorID=book.AuthorID,
        Isbn=book.Isbn,
        PublicationDate=book.PublicationDate,
        Genre=book.Genre,
        Available=book.Available
    )
    db.add(db_book)
    db.commit()
    db.refresh(db_book)
    return db_book


# Endpoint to update an existing book
@router.put("/books/{book_id}", response_model=BookResponse)
def update_book(book_id: int, book: BookUpdate, db: Session = Depends(get_db)):
    db_book = db.query(Book).options(joinedload(Book.author)).filter(Book.BookID == book_id).first()
    if db_book is None:
        raise HTTPException(status_code=404, detail="Book not found")

    db_book.Title = book.Title if book.Title is not None else db_book.Title
    db_book.AuthorID = book.AuthorID if book.AuthorID is not None else db_book.AuthorID
    db_book.Isbn = book.Isbn if book.Isbn is not None else db_book.Isbn
    db_book.PublicationDate = book.PublicationDate if book.PublicationDate is not None else db_book.PublicationDate
    db_book.Genre = book.Genre if book.Genre is not None else db_book.Genre
    db_book.Available = book.Available if book.Available is not None else db_book.Available

    db.commit()
    db.refresh(db_book)
    return db_book


# Endpoint to delete a book
@router.delete("/books/{book_id}", response_model=BookResponse)
def delete_book(book_id: int, db: Session = Depends(get_db)):
    db_book = db.query(Book).options(joinedload(Book.author)).filter(Book.BookID == book_id).first()
    if db_book is None:
        raise HTTPException(status_code=404, detail="Book not found")

    db.delete(db_book)
    db.commit()
    return db_book


