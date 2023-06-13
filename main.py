# from fastapi import FastAPI

# app = FastAPI()


# @app.post("/login")
# def login(email: str, password: str):
#     # Perform login logic here
#     return {"message": "Logged in successfully"}


# @app.post("/signup")
# def signup(email: str, password: str):
#     # Perform signup logic here
#     return {"message": "Signup successful"}


# from fastapi import FastAPI, Depends
# from sqlalchemy.orm import Session
# from .database import engine, Base, get_db, User

# Base.metadata.create_all(bind=engine)

# app = FastAPI()


# @app.post("/login")
# def login(email: str, password: str, db: Session = Depends(get_db)):
#     user = db.query(User).filter(User.email == email, User.password == password).first()
#     if user:
#         return {"message": "Logged in successfully"}
#     else:
#         return {"message": "Invalid email or password"}


# @app.post("/signup")
# def signup(email: str, password: str, db: Session = Depends(get_db)):
#     user = db.query(User).filter(User.email == email).first()
#     if user:
#         return {"message": "Email already exists"}
#     else:
#         new_user = User(email=email, password=password)
#         db.add(new_user)
#         db.commit()
#         return {"message": "Signup successful"}


from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

DATABASE_URL = "mysql+mysqlconnector://username:password@hostname:port/database_name"

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


class User(Base):
    _tablename_ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(50), unique=True)
    email = Column(String(50), unique=True)
    password = Column(String(128))


Base.metadata.create_all(bind=engine)


class UserCreate(BaseModel):
    username: str
    email: str
    password: str


class UserRead(BaseModel):
    id: int
    username: str
    email: str


@app.post("/users", response_model=UserRead)
def create_user(user: UserCreate):
    db = SessionLocal()
    db_user = User(
        username=user.username,
        email=user.email,
        password=user.password
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


@app.get("/users", response_model=List[UserRead])
def get_users():
    db = SessionLocal()
    users = db.query(User).all()
    return users