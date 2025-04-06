import os
import sys
from flask import Blueprint, request, jsonify

# Add the path to the 'finmate' folder to the Python path
sys.path.append(os.path.join(os.path.dirname(__file__), '../../finmate'))

# Import the analyze_spending_function from the correct module
from analyze_spending import analyze_spending_function  # Ensure this file exists

analyze_spending_bp = Blueprint('analyze_spending', __name__)

@analyze_spending_bp.route('/analyze-spending', methods=['POST'])
def analyze_spending():
    try:
        input_data = request.json
        if not input_data:
            return jsonify({"success": False, "message": "Input data is required"}), 400

        # Call the analyze_spending_function with the input data
        result = analyze_spending_function(input_data)
        return jsonify({"success": True, "data": result}), 200
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500
