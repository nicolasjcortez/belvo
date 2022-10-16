from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# SQLALCHEMY_DATABASE_URL = "postgresql://postgres:#@127.0.0.1:5432/belvo"
SQLALCHEMY_DATABASE_URL = 'postgresql://postgres:#@database-1.c1im5ojuz2tu.us-west-2.rds.amazonaws.com:5432/belvo'

engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

