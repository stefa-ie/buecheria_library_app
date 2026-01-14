from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session, joinedload
from typing import List
from ..database.database import get_db
from ..models.loan import Loan
from ..models.book import Book
from ..schemas.loan import LoanResponse, LoanCreate, LoanUpdate

router = APIRouter()

# Endpoint to read all loans
@router.get("/loans", response_model=List[LoanResponse])
def read_loans(db: Session = Depends(get_db)):
    loans = db.query(Loan).options(
        joinedload(Loan.book).joinedload(Book.author),
        joinedload(Loan.member)
    ).all()
    return loans


# Endpoint to read specific loan by ID
@router.get("/loans/{loan_id}", response_model=LoanResponse)
def read_loan(loan_id: int, db: Session = Depends(get_db)):
    loan = db.query(Loan).options(
        joinedload(Loan.book).joinedload(Book.author),
        joinedload(Loan.member)
    ).filter(Loan.LoanID == loan_id).first()
    if loan is None:
        raise HTTPException(status_code=404, detail="Loan not found")
    return loan


# Endpoint to create new loan
@router.post("/loans", response_model=LoanResponse)
def create_loan(loan: LoanCreate, db: Session = Depends(get_db)):
    db_loan = Loan(
        MemberID=loan.MemberID, 
        BookID=loan.BookID, 
        IssueDate=loan.LoanDate, 
        DueDate=loan.DueDate, 
        ReturnDate=loan.ReturnDate
    )
    db.add(db_loan)
    db.commit()
    db.refresh(db_loan)
    # Reload with relationships
    db_loan = db.query(Loan).options(
        joinedload(Loan.book).joinedload(Book.author),
        joinedload(Loan.member)
    ).filter(Loan.LoanID == db_loan.LoanID).first()
    return db_loan


# Endpoint to update an existing loan
@router.put("/loans/{loan_id}", response_model=LoanResponse)
def update_loan(loan_id: int, loan: LoanUpdate, db: Session = Depends(get_db)):
    db_loan = db.query(Loan).filter(Loan.LoanID == loan_id).first()
    if db_loan is None:
        raise HTTPException(status_code=404, detail="Loan not found")
    
    db_loan.MemberID = loan.MemberID if loan.MemberID is not None else db_loan.MemberID
    db_loan.BookID = loan.BookID if loan.BookID is not None else db_loan.BookID
    db_loan.IssueDate = loan.LoanDate if loan.LoanDate is not None else db_loan.IssueDate
    db_loan.DueDate = loan.DueDate if loan.DueDate is not None else db_loan.DueDate
    db_loan.ReturnDate = loan.ReturnDate if loan.ReturnDate is not None else db_loan.ReturnDate
    
    db.commit()
    # Reload with relationships
    db_loan = db.query(Loan).options(
        joinedload(Loan.book).joinedload(Book.author),
        joinedload(Loan.member)
    ).filter(Loan.LoanID == loan_id).first()
    return db_loan


# Endpoint to delete a loan
@router.delete("/loans/{loan_id}", response_model=LoanResponse)
def delete_loan(loan_id: int, db: Session = Depends(get_db)):
    db_loan = db.query(Loan).options(
        joinedload(Loan.book).joinedload(Book.author),
        joinedload(Loan.member)
    ).filter(Loan.LoanID == loan_id).first()
    if db_loan is None:
        raise HTTPException(status_code=404, detail="Loan not found")
    
    # Store the loan data before deletion
    loan_data = db_loan
    db.delete(db_loan)
    db.commit()
    return loan_data

