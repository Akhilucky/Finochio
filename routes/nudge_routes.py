from flask import Blueprint, jsonify, request
from db import mongo
from utils.jwt_helper import verify_token

nudge_bp = Blueprint('nudge', __name__)

nudges = [
    {"id": 1, "message": "Try saving 10% of your income this month!"},
    {"id": 2, "message": "Consider cutting down on subscriptions you don’t use."},
    {"id": 3, "message": "Can you go a day without spending money? Try it today!"},
]

@nudge_bp.route('/get', methods=['GET'])
def get_nudges():
    token = request.headers.get('Authorization')
    user_id = verify_token(token)
    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401

    # Optionally, customize nudges based on user's transaction history
    return jsonify({"nudges": nudges})

