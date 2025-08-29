from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from backend.database import get_db
from backend.models.author import Author
from backend.schemas.author import AuthorResponse, AuthorCreate, AuthorUpdate

router = APIRouter()

# Endpoint to read all authors
@router.get("/authors", response_model=List[AuthorResponse])
def read_authors(db: Session = Depends(get_db)):
    authors = db.query(Author).all()
    return authors


# Endpoint to read specific author by ID
@router.get("/authors/{author_id}", response_model=AuthorResponse)
def read_author(author_id: int, db: Session = Depends(get_db)):
    author = db.query(Author).filter(Author.AuthorID == author_id).first()
    if author is None:
        raise HTTPException(status_code=404, detail="Author not found")
    return author


# Endpoint to create new author
@router.post("/authors", response_model=AuthorResponse)
def create_author(author: AuthorCreate, db: Session = Depends(get_db)):
    db_author = Author(LastName=author.LastName, FirstName=author.FirstName, BirthDate=author.BirthDate)
    db.add(db_author)
    db.commit()
    db.refresh(db_author)
    return db_author


# Endpoint to update an existing author
@router.put("/authors/{author_id}", response_model=AuthorResponse)
def update_author(author_id: int, author: AuthorUpdate, db: Session = Depends(get_db)):
    db_author = db.query(Author).filter(Author.AuthorID == author_id).first()
    if db_author is None:
        raise HTTPException(status_code=404, detail="Author not found")
    
    db_author.LastName = author.LastName if author.LastName is not None else db_author.LastName
    db_author.FirstName = author.FirstName if author.FirstName is not None else db_author.FirstName
    db_author.BirthDate = author.BirthDate if author.BirthDate is not None else db_author.BirthDate
    db.commit()
    db.refresh(db_author)
    return db_author


# Endpoint to delete an author
@router.delete("/authors/{author_id}", response_model=AuthorResponse)
def delete_author(author_id: int, db: Session = Depends(get_db)):
    db_author = db.query(Author).filter(Author.AuthorID == author_id).first()
    if db_author is None:
        raise HTTPException(status_code=404, detail="Author not found")
    
    db.delete(db_author)
    db.commit()
    return db_author


