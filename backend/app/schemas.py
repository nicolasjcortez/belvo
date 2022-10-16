from typing import Union
from typing import List, Optional
from pydantic import BaseModel


class LinkBase(BaseModel):
    link: str

class LinkAndAccount(BaseModel):
    account_id: str
    link_id: str
    
class LinkWithDates(LinkBase):
    date_from: str
    date_to: str

class LinkCreate(LinkBase):
    institution: str


class Link(LinkBase):
    id: int
    owner_id: int

    class Config:
        orm_mode = True


class UserBase(BaseModel):
    username: str
    email: str


class UserCreate(UserBase):
    password: str


class User(UserBase):
    id: int
    is_active: bool
    links: List[Link] = []

    class Config:
        orm_mode = True


class TokenData(BaseModel):
    id: Union[str, None] = None

class Token(BaseModel):
    access_token: str
    token_type: str