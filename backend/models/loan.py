from database.database import Base
from sqlalchemy import Column, Integer, Date, ForeignKey
from sqlalchemy.orm import relationship

class Loan(Base):
    __tablename__ = "loans"

    LoanID = Column(Integer, primary_key=True, index=True)
    BookID = Column(Integer, ForeignKey("books.BookID"), index=True)
    MemberID = Column(Integer, ForeignKey("members.MemberID"), index=True)
    IssueDate = Column(Date, index=True)
    DueDate = Column(Date, index=True)
    ReturnDate = Column(Date,index=True)

    # Relationships
    book = relationship("Book", back_populates="loans")
    member = relationship("Member", back_populates="loans")

    # Compatibility property: expose LoanDate for Pydantic schemas expecting that name
    @property
    def LoanDate(self):
        return self.IssueDate

    @LoanDate.setter
    def LoanDate(self, value):
        self.IssueDate = value
