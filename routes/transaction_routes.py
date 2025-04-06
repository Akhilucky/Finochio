from flask import Blueprint, request, jsonify
from db import mongo
from utils.jwt_helper import verify_token

transaction_bp = Blueprint('transactions', __name__)

@transaction_bp.route('/add', methods=['POST'])
def add_transaction():
    token = request.headers.get('Authorization')
    user_id = verify_token(token)
    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401

    data = request.json
    data['user_id'] = user_id
    mongo.db.transactions.insert_one(data)
    return jsonify({"message": "Transaction added"})

@transaction_bp.route('/history', methods=['GET'])
def get_history():
    token = request.headers.get('Authorization')
    user_id = verify_token(token)
    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401

    transactions = list(mongo.db.transactions.find({"user_id": user_id}))
    for txn in transactions:
        txn['_id'] = str(txn['_id'])
    return jsonify({"transactions": transactions})