from sqlalchemy import create_engine, Column, Integer, String, DateTime
from datetime import datetime
from sqlalchemy.orm import Session, sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from pydantic import BaseModel
from typing import List

from fastapi import FastAPI, Depends, HTTPException

app = FastAPI()

DATABASE_URL = "sqlite:///./buecheria.db"

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(bind=engine)
Base = declarative_base()

class Author(Base):
    __tablename__ = "authors"

    AuthorID = Column(Integer, primary_key=True, unique=True, index=True)
    LastName = Column(String, index=True)
    FirstName = Column(String, index=True)
    BirthDate = Column(DateTime, index=True)

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
class UserResponse(BaseModel):
    AuthorID: int
    LastName: str
    FirstName: str
    BirthDate: datetime

    class Config:
        orm_mode = True

@app.get("/authors", response_model=List[UserResponse])
# Endpoint to read all authors
def read_authors(db: Session = Depends(get_db)):
    authors = db.query(Author).all()
    return authors

@app.get("/authors/{author_id}", response_model=UserResponse)
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
        
@app.post("/authors", response_model=UserResponse)
# Endpoint to create new author
def create_author(author: AuthorCreate, db: Session = Depends(get_db)):
    db_author = Author(LastName=author.LastName, FirstName=author.FirstName, BirthDate=author.BirthDate)
    db.add(db_author)
    db.commit()
    db.refresh(db_author)
    return db_author

