import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../../')))

from ml_model import process_finance_message, generate_chat_response
from flask import Blueprint, request, jsonify
from datetime import datetime
from pymongo import MongoClient

client = MongoClient("mongodb://localhost:27017/")
db = client["finance_chat_db"]
chats_collection = db["chats"]

chat = Blueprint("chat", __name__)

@chat.route("/message", methods=["GET","POST"])
def chat_handler():
    data = request.json
    text = data.get("text", "")
    
    parsed = process_finance_message(text)
    response = generate_chat_response(parsed)

    chats_collection.insert_one({
        "user_id": user_id,
        "user_message": text,
        "bot_response": response,
        "timestamp": datetime.utcnow()
    })

    
    return jsonify({"response": response})
