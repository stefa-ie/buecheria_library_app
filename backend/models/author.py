from ..database.database import Base
from sqlalchemy import Column, Integer, String, Date, DateTime
from sqlalchemy.orm import relationship

class Author(Base):
    __tablename__ = "authors"

    AuthorID = Column(Integer, primary_key=True, unique=True, index=True)
    LastName = Column(String, index=True)
    FirstName = Column(String, index=True)
    BirthDate = Column(Date, index=True)

    # One-to-many relationship (Author -> Books)
    books = relationship("Book", back_populates="author")

