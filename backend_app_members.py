from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel
from database import Base, engine, get_db
from sqlalchemy import Column, Integer, String, DateTime

app = FastAPI()

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

# Create database tables
Base.metadata.create_all(bind=engine)

# Pydantic model for response
class MemberResponse(BaseModel):
    MemberID: int
    LastName: str
    FirstName: str
    Address: str
    Email: str
    Phone: str
    BirthDate: datetime
    JoinDate: datetime
    MembershipStatus: str

    class Config:
        orm_mode = True


@app.get("/members", response_model=List[MemberResponse])
# Endpoint to read all members
def read_members(db: Session = Depends(get_db)):
    members = db.query(Member).all()
    return members

@app.get("/members/{member_id}", response_model=MemberResponse)
# Endpoint to read specific member by ID
def read_member(member_id: int, db: Session = Depends(get_db)):
    member = db.query(Member).filter(Member.MemberID == member_id).first()
    if member is None:
        raise HTTPException(status_code=404, detail="Member not found")
    return member


# Pydantic model for creating a new member
class MemberCreate(BaseModel):
    LastName: str
    FirstName: str
    Address: str
    Email: str
    Phone: str
    BirthDate: datetime
    JoinDate: datetime
    MembershipStatus: str

@app.post("/members", response_model=MemberResponse)
# Endpoint to create a new member
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


# Pydantic model for updating existing member
class MemberUpdate(BaseModel):
    LastName: Optional[str] = None
    FirstName: Optional[str] = None
    Address: Optional[str] = None
    Email: Optional[str] = None
    Phone: Optional[str] = None
    BirthDate: Optional[datetime] = None
    JoinDate: Optional[datetime] = None
    MembershipStatus: Optional[str] = None


@app.put("/members/{member_id}", response_model=MemberResponse)
# Endpoint to update an existing member
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


@app.delete("/members/{member_id}", response_model=MemberResponse)
# Endpoint to delete a member
def delete_member(member_id: int, db: Session = Depends(get_db)):
    db_member = db.query(Member).filter(Member.MemberID == member_id).first()
    if db_member is None:
        raise HTTPException(status_code=404, detail="Member not found")

    db.delete(db_member)
    db.commit()
    return db_member