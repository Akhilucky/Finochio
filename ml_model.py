# ml_model.py

import re

def extract_amount(text):
    match = re.search(r'₹?\s?(\d+)', text)
    return int(match.group(1)) if match else None

def process_finance_message(text):
    text = text.lower()

    # Intent: Add a transaction
    if any(word in text for word in ["spent", "paid", "bought", "purchased"]):
        amount = extract_amount(text)
        category = "unknown"
        if "grocer" in text:
            category = "groceries"
        elif "food" in text or "restaurant" in text:
            category = "food"
        elif "rent" in text:
            category = "rent"

        return {
            "intent": "add_transaction",
            "amount": amount,
            "category": category
        }

    # Intent: Query total spend
    elif "how much" in text and "spend" in text:
        return {"intent": "query_total_spend"}

    # Intent: Ask for saving tips
    elif "save" in text or "tip" in text:
        return {"intent": "budget_tip"}

    # General chat
    else:
        return {"intent": "general_chat"}


def generate_chat_response(intent_obj):
    intent = intent_obj["intent"]

    if intent == "add_transaction":
        amount = intent_obj.get("amount", 0)
        category = intent_obj.get("category", "general")
        # 👉 Here you can insert into DB
        return f"Got it! Logged ₹{amount} for {category}."

    elif intent == "query_total_spend":
        # 👉 Replace with real DB query
        return "You've spent ₹12,300 so far this month."

    elif intent == "budget_tip":
        return "Try the 50/30/20 rule: 50% needs, 30% wants, 20% savings!"

    else:
        return "I'm here to help with your money! Ask me anything like 'I spent ₹500 on groceries'."
