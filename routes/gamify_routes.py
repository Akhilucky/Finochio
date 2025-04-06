from flask import Blueprint, jsonify, request
from db import mongo
from utils.jwt_helper import verify_token
from datetime import datetime

gamify_bp = Blueprint('gamify', __name__)

# Sample challenges for gamification
challenges = [
    {"id": 1, "title": "Save ₹1000 this week", "reward": 50},
    {"id": 2, "title": "Track all expenses for 5 days", "reward": 30},
    {"id": 3, "title": "No eating out for 3 days", "reward": 20},
]

@gamify_bp.route('/challenges', methods=['GET'])
def get_challenges():
    return jsonify({"challenges": challenges})

@gamify_bp.route('/complete', methods=['POST'])
def complete_challenge():
    token = request.headers.get('Authorization')
    user_id = verify_token(token)
    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401

    data = request.json
    challenge_id = data.get('challenge_id')

    # Log completion in MongoDB
    mongo.db.completed_challenges.insert_one({
        "user_id": user_id,
        "challenge_id": challenge_id
    })

    return jsonify({"message": "Challenge completed!"})

@gamify_bp.route('/', methods=['GET'])
def gamify_home():
     return "<h2>Welcome to the Gamify Section 🎮💸</h2><p>Track challenges and rewards here.</p>"



