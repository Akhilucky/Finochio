from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from db import mongo
from utils.jwt_helper import generate_token
from datetime import datetime

auth_bp = Blueprint('auth', __name__)

@auth_bp.route("/api/signup", methods=["POST"])  # Updated route
def signup():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    if mongo.db.users.find_one({"email": email}):
        return jsonify({"message": "User already exists"}), 409

    hashed_password = generate_password_hash(password)

    user = {
        "email": email,
        "password": hashed_password,
        "created_at": datetime.utcnow()
    }

    mongo.db.users.insert_one(user)

    return jsonify({"message": "Signup successful", "user": {"email": email}}), 201


@auth_bp.route("/api/login", methods=["POST"])  # Updated route
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    user = mongo.db.users.find_one({"email": email})
    if not user or not check_password_hash(user["password"], password):
        return jsonify({"message": "Invalid email or password"}), 401

    mongo.db.users.update_one(
        {"email": email},
        {"$set": {"last_login": datetime.utcnow()}}
    )

    return jsonify({"message": "Login successful", "user": {"email": email}}), 200