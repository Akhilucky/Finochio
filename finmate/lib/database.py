from sqlalchemy import create_engine, Column, Integer, String, Float, DateTime, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship
from datetime import datetime

# Create database engine
engine = create_engine('sqlite:///finmate.db')
Base = declarative_base()

# Define LoanRequest model
class LoanRequest(Base):
    __tablename__ = 'loan_requests'
    
    id = Column(Integer, primary_key=True)
    user_id = Column(String, nullable=False)
    amount = Column(Float, nullable=False)
    reason = Column(String, nullable=False)
    status = Column(String, default='PENDING')
    created_at = Column(DateTime, default=datetime.utcnow)
    
# Create tables
Base.metadata.create_all(engine)

# Create session factory
SessionLocal = sessionmaker(bind=engine)
