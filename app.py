from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
import jwt
from datetime import datetime, timedelta
from functools import wraps
import os
from routes.analyzespending_routes import analyze_spending_bp

# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)

# Configure SQLAlchemy with SQLite
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///finance_chat_db.sqlite"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db = SQLAlchemy(app)

# Define User model
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)
    last_login = db.Column(db.DateTime, nullable=True)

# Define Spending model
class Spending(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_email = db.Column(db.String(120), nullable=False)
    amount = db.Column(db.Float, nullable=False)
    category = db.Column(db.String(120), nullable=False)
    type = db.Column(db.String(50), nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)

# JWT Authentication Decorator
def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization')
        if not token:
            return jsonify({"success": False, "message": "Token is missing"}), 401

        try:
            # Ensure the token starts with "Bearer " and extract the actual token
            if token.startswith("Bearer "):
                token = token.split(" ")[1]
            else:
                raise ValueError("Token must start with 'Bearer '")

            decoded = jwt.decode(token, os.getenv("JWT_SECRET"), algorithms=["HS256"])
            request.user_email = decoded["email"]
        except jwt.ExpiredSignatureError:
            return jsonify({"success": False, "message": "Token has expired"}), 401
        except jwt.InvalidTokenError:
            return jsonify({"success": False, "message": "Invalid token"}), 401
        except Exception as e:
            return jsonify({"success": False, "message": f"Token error: {str(e)}"}), 401

        return f(*args, **kwargs)
    return decorated

# Validate JSON payloads
def validate_json(required_fields):
    def decorator(f):
        @wraps(f)
        def wrapped(*args, **kwargs):
            if not request.is_json:
                return jsonify({"success": False, "message": "Invalid JSON payload"}), 400
            data = request.get_json()
            missing_fields = [field for field in required_fields if field not in data]
            if missing_fields:
                return jsonify({"success": False, "message": f"Missing fields: {', '.join(missing_fields)}"}), 400
            return f(*args, **kwargs)
        return wrapped
    return decorator

# Signup route
@app.route('/api/signup', methods=['POST'])
@validate_json(["email", "password"])
def signup():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"success": False, "message": "Email and password are required"}), 400

    # Check if the user already exists
    existing_user = User.query.filter_by(email=email).first()
    if (existing_user):
        return jsonify({"success": False, "message": "User already exists"}), 409

    # Save the user to the database with a hashed password
    hashed_password = generate_password_hash(password)
    new_user = User(email=email, password=hashed_password)
    try:
        db.session.add(new_user)
        db.session.commit()
    except Exception:
        db.session.rollback()
        return jsonify({"success": False, "message": "An error occurred while creating the user"}), 500

    return jsonify({"success": True, "message": "User created!"}), 201

# Login route
@app.route('/api/login', methods=['POST'])
@validate_json(["email", "password"])
def login():
    data = request.json
    email = data.get('email')  # Use 'email' instead of 'username'
    password = data.get('password')

    user = User.query.filter_by(email=email).first()  # Query by email
    if user and check_password_hash(user.password, password):  # Use check_password_hash
        token = jwt.encode(
            {"email": user.email, "exp": datetime.utcnow() + timedelta(hours=1)},
            os.getenv("JWT_SECRET"),
            algorithm="HS256"
        )
        return jsonify({"success": True, "token": token})
    return jsonify({"success": False, "message": "Invalid credentials"}), 401

# Protected dashboard route
@app.route('/api/dashboard', methods=['GET'])
@token_required
def get_dashboard_data():
    user_email = request.user_email  # Get user email from the token

    user = User.query.filter_by(email=user_email).first()

    if not user:
        return jsonify({"success": False, "message": "User not found"}), 404

    # Log the user email for debugging
    print(f"Dashboard accessed by: {user_email}")

    # Derive a placeholder name from the email
    name = user.email.split('@')[0].capitalize()

    # Example user-specific data
    return jsonify({
        "success": True,
        "email": user.email,
        "name": name,  # Include the derived name
        "totalSpent": 124500,  # Replace with actual data from the database
        "remainingBudget": 75550,
        "topCategory": "Food & Dining",
        "gamification": {
            "wheelSpinsLeft": 3,  # Example: Number of spins left for the wheel
        }
    })

# Update stats route
@app.route('/api/update-stats', methods=['POST'])
@token_required
def update_stats():
    data = request.json
    user_email = request.user_email  # Get user email from the token
    user = User.query.filter_by(email=user_email).first()

    if not user:
        return jsonify({"success": False, "message": "User not found"}), 404

    # Update stats in the database (this is just a placeholder)
    return jsonify({"success": True, "message": "Stats updated successfully"})

# Update budget route
@app.route('/api/update-budget', methods=['POST'])
@validate_json(["email", "remainingBudget", "wheelSpinsLeft"])
def update_budget():
    data = request.json
    email = data.get('email')  # Get email from the request body

    if not email:
        return jsonify({"success": False, "message": "Email is required"}), 400

    user = User.query.filter_by(email=email).first()

    if not user:
        return jsonify({"success": False, "message": "User not found"}), 404

    # Example: Update budget and wheel spins in the database (placeholder logic)
    new_budget = data.get("remainingBudget")
    new_wheel_spins = data.get("wheelSpinsLeft")

    # Simulate saving to the database (replace with actual DB logic)
    updated_data = {
        "remainingBudget": new_budget,
        "wheelSpinsLeft": new_wheel_spins,
    }

    return jsonify({"success": True, "message": "Budget updated successfully", "data": updated_data})

# Route to fetch spending history without authentication
@app.route('/api/spending-history', methods=['POST'])
@validate_json(["email"])
def get_spending_history():
    data = request.json
    email = data.get("email")

    if not email:
        return jsonify({"success": False, "message": "Email is required"}), 400

    spendings = Spending.query.filter_by(user_email=email).order_by(Spending.timestamp.desc()).all()

    spending_data = [
        {
            "amount": spending.amount,
            "category": spending.category,
            "type": spending.type,
            "timestamp": spending.timestamp.strftime("%Y-%m-%d %H:%M:%S")
        }
        for spending in spendings
    ]

    return jsonify({"success": True, "data": spending_data}), 200

# Register the analyze_spending blueprint
app.register_blueprint(analyze_spending_bp, url_prefix='/api')

if __name__ == '__main__':
    app.run(debug=True, port=3000)