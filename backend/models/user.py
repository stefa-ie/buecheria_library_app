from database.database import Base
from sqlalchemy import Column, Integer, String

class User(Base):
    __tablename__ = "users"

    UserID = Column(Integer, primary_key=True, index=True)
    Username = Column(String, unique=True, index=True, nullable=False)
    Password = Column(String, nullable=False)
    Role = Column(String, default="user", index=True)
