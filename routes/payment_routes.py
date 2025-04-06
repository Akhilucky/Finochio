from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from dotenv import load_dotenv
import os
import razorpay
from bson import ObjectId

load_dotenv()

payments = Blueprint('payments', __name__)

razorpay_client = razorpay.Client(auth=(os.getenv("RAZORPAY_KEY_ID"), os.getenv("RAZORPAY_KEY_SECRET")))

@payments.route('/create_order', methods=['POST'])
@jwt_required()
def create_order():
    data = request.json
    amount = int(data['amount']) * 100  # Convert to paise
    currency = 'INR'
    receipt = f"receipt_{ObjectId()}"

    order = razorpay_client.order.create({
        'amount': amount,
        'currency': currency,
        'receipt': receipt,
        'payment_capture': 1
    })

    return jsonify({
        'order_id': order['id'],
        'razorpay_key_id': os.getenv("RAZORPAY_KEY_ID"),
        'amount': amount,
        'currency': currency
    })

@payments.route('/verify', methods=['POST'])
@jwt_required()
def verify_payment():
    data = request.json
    try:
        # Verifying the signature
        razorpay_client.utility.verify_payment_signature({
            'razorpay_order_id': data['order_id'],
            'razorpay_payment_id': data['payment_id'],
            'razorpay_signature': data['signature']
        })
        return jsonify({'message': 'Payment verified successfully'}), 200
    except razorpay.errors.SignatureVerificationError:
        return jsonify({'message': 'Payment verification failed'}), 400
