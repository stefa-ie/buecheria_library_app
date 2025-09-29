from backend.database.database import Base
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship

class Book(Base):
    __tablename__ = "books"

    BookID = Column(Integer, primary_key=True, unique=True, index=True)
    Title = Column(String, index=True)
    AuthorID = Column(Integer, ForeignKey("authors.AuthorID"), index=True)
    Isbn = Column(String, unique=True, index=True)
    PublicationDate = Column(DateTime, index=True)
    Genre = Column(String, index=True)

    # Many-to-one relationship (Books -> Author)
    author = relationship("Author", back_populates="books")
    # One-to-many relationship (Book -> Loans)
    loans = relationship("Loan", back_populates="book")

