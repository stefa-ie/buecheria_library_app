from fastapi import APIRouter, FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel
from database import Base, engine, get_db
from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.orm import relationship

router = APIRouter()

class Author(Base):
    __tablename__ = "authors"

    AuthorID = Column(Integer, primary_key=True, unique=True, index=True)
    LastName = Column(String, index=True)
    FirstName = Column(String, index=True)
    BirthDate = Column(DateTime, index=True)

    # One-to-many relationship (Author -> Books)
    books = relationship("Book", back_populates="author")

# Create database tables
Base.metadata.create_all(bind=engine)


# Pydantic model for response
class AuthorResponse(BaseModel):
    AuthorID: int
    LastName: str
    FirstName: str
    BirthDate: datetime

    class Config:
        orm_mode = True


@router.get("/authors", response_model=List[AuthorResponse])
# Endpoint to read all authors
def read_authors(db: Session = Depends(get_db)):
    authors = db.query(Author).all()
    return authors


@router.get("/authors/{author_id}", response_model=AuthorResponse)
# Endpoint to read specific author by ID
def read_author(author_id: int, db: Session = Depends(get_db)):
    author = db.query(Author).filter(Author.AuthorID == author_id).first()
    if author is None:
        raise HTTPException(status_code=404, detail="Author not found")
    return author


# Pydantic model for creating new author
class AuthorCreate(BaseModel):
    LastName: str
    FirstName: str
    BirthDate: datetime
        

@router.post("/authors", response_model=AuthorResponse)
# Endpoint to create new author
def create_author(author: AuthorCreate, db: Session = Depends(get_db)):
    db_author = Author(LastName=author.LastName, FirstName=author.FirstName, BirthDate=author.BirthDate)
    db.add(db_author)
    db.commit()
    db.refresh(db_author)
    return db_author


# Pydantic model for updating existing author
class AuthorUpdate(BaseModel):
    LastName: Optional[str] = None
    FirstName: Optional[str] = None
    BirthDate: Optional[datetime] = None


@router.put("/authors/{author_id}", response_model=AuthorResponse)
# Endpoint to update an existing author
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


@router.delete("/authors/{author_id}", response_model=AuthorResponse)
# Endpoint to delete an author
def delete_author(author_id: int, db: Session = Depends(get_db)):
    db_author = db.query(Author).filter(Author.AuthorID == author_id).first()
    if db_author is None:
        raise HTTPException(status_code=404, detail="Author not found")
    
    db.delete(db_author)
    db.commit()
    return db_author


