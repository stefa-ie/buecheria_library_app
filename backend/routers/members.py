from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from database.database import get_db
from models.member import Member
from schemas.member import MemberResponse, MemberCreate, MemberUpdate

router = APIRouter()

# Endpoint to read all members
@router.get("/members", response_model=List[MemberResponse])
def read_members(db: Session = Depends(get_db)):
    members = db.query(Member).all()
    return members

# Endpoint to read specific member by ID
@router.get("/members/{member_id}", response_model=MemberResponse)
def read_member(member_id: int, db: Session = Depends(get_db)):
    member = db.query(Member).filter(Member.MemberID == member_id).first()
    if member is None:
        raise HTTPException(status_code=404, detail="Member not found")
    return member


# Endpoint to create a new member
@router.post("/members", response_model=MemberResponse)
def create_member(member: MemberCreate, db: Session = Depends(get_db)):
    db_member = Member(
        LastName=member.LastName,
        FirstName=member.FirstName,
        Address=member.Address,
        Email=member.Email,
        Phone=member.Phone,
        BirthDate=member.BirthDate,
        JoinDate=member.JoinDate,
        MembershipStatus=member.MembershipStatus
    )
    db.add(db_member)
    db.commit()
    db.refresh(db_member)
    return db_member


# Endpoint to update an existing member
@router.put("/members/{member_id}", response_model=MemberResponse)
def update_member(member_id: int, member: MemberUpdate, db: Session = Depends(get_db)):
    db_member = db.query(Member).filter(Member.MemberID == member_id).first()
    if db_member is None:
        raise HTTPException(status_code=404, detail="Member not found")

    db_member.LastName = member.LastName if member.LastName is not None else db_member.LastName
    db_member.FirstName = member.FirstName if member.FirstName is not None else db_member.FirstName
    db_member.Address = member.Address if member.Address is not None else db_member.Address
    db_member.Email = member.Email if member.Email is not None else db_member.Email
    db_member.Phone = member.Phone if member.Phone is not None else db_member.Phone
    db_member.BirthDate = member.BirthDate if member.BirthDate is not None else db_member.BirthDate
    db_member.JoinDate = member.JoinDate if member.JoinDate is not None else db_member.JoinDate
    db_member.MembershipStatus = member.MembershipStatus if member.MembershipStatus is not None else db_member.MembershipStatus

    db.commit()
    db.refresh(db_member)
    return db_member


# Endpoint to delete a member
@router.delete("/members/{member_id}", response_model=MemberResponse)
def delete_member(member_id: int, db: Session = Depends(get_db)):
    db_member = db.query(Member).filter(Member.MemberID == member_id).first()
    if db_member is None:
        raise HTTPException(status_code=404, detail="Member not found")

    db.delete(db_member)
    db.commit()
    return db_member