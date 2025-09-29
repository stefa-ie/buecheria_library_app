from backend.database.database import Base
from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.orm import relationship

class Member(Base):
    __tablename__ = "members"

    MemberID = Column(Integer, primary_key=True, unique=True, index=True)
    LastName = Column(String, index=True)
    FirstName = Column(String, index=True)
    Address = Column(String, index=True)
    Email = Column(String, unique=True, index=True)
    Phone = Column(String, index=True)
    BirthDate = Column(DateTime, index=True)
    JoinDate = Column(DateTime, index=True)
    MembershipStatus = Column(String, index=True)

    # One-to-many relationship (Member -> Loans)
    loans = relationship("Loan", back_populates="member")