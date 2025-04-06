from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

# Define the User model
class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.String(50), unique=True, nullable=False)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)

# Define the Chat model
class Chat(db.Model):
    __tablename__ = 'chats'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.String(50), db.ForeignKey('users.user_id'), nullable=False)
    user_message = db.Column(db.Text, nullable=False)
    bot_response = db.Column(db.Text, nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)

# Create a user
def create_user(user_id, name, email):
    if User.query.filter_by(user_id=user_id).first():
        return "User already exists"
    new_user = User(user_id=user_id, name=name, email=email)
    db.session.add(new_user)
    db.session.commit()
    return "User created"

# Save a chat
def save_chat(user_id, user_message, bot_response):
    if not User.query.filter_by(user_id=user_id).first():
        return "User does not exist"
    new_chat = Chat(user_id=user_id, user_message=user_message, bot_response=bot_response)
    db.session.add(new_chat)
    db.session.commit()

# Get user chats
def get_user_chats(user_id):
    return Chat.query.filter_by(user_id=user_id).order_by(Chat.timestamp.desc()).all()