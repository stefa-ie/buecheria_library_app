from datetime import date
from typing import Optional, Union
import re
from pydantic import BaseModel, field_validator

ALLOWED_BIRTHDATE_PATTERNS = [
    re.compile(r"^\d{4}$"),
    re.compile(r"^\d{2}-\d{4}$"),
    re.compile(r"^\d{2}-\d{2}-\d{4}$"),
]


def normalize_birth_date(value: Optional[Union[str, int, date]]) -> Optional[str]:
    if value is None:
        return None
    if isinstance(value, date):
        return value.strftime("%d-%m-%Y")
    if isinstance(value, int):
        value = str(value)
    if isinstance(value, str):
        trimmed = value.strip()
        if not trimmed:
            return None
        if re.fullmatch(r"\d{4}-\d{2}-\d{2}", trimmed):
            year, month, day = trimmed.split("-")
            return f"{day}-{month}-{year}"
        if re.fullmatch(r"\d{4}-\d{2}", trimmed):
            year, month = trimmed.split("-")
            return f"{month}-{year}"
        if any(pattern.match(trimmed) for pattern in ALLOWED_BIRTHDATE_PATTERNS):
            return trimmed
        raise ValueError("BirthDate must be YYYY, MM-YYYY, or DD-MM-YYYY")
    return str(value)

# Pydantic model for response
class AuthorResponse(BaseModel):
    AuthorID: int
    LastName: str
    FirstName: str
    BirthDate: Optional[str] = None

    @field_validator("BirthDate", mode="before")
    @classmethod
    def validate_birth_date(cls, value):
        return normalize_birth_date(value)

    class Config:
        from_attributes = True


# Pydantic model for creating new author
class AuthorCreate(BaseModel):
    LastName: str
    FirstName: str
    BirthDate: Optional[str] = None

    @field_validator("BirthDate", mode="before")
    @classmethod
    def validate_birth_date(cls, value):
        return normalize_birth_date(value)
        
        
# Pydantic model for updating existing author
class AuthorUpdate(BaseModel):
    LastName: Optional[str] = None
    FirstName: Optional[str] = None
    BirthDate: Optional[str] = None

    @field_validator("BirthDate", mode="before")
    @classmethod
    def validate_birth_date(cls, value):
        return normalize_birth_date(value)
    
    