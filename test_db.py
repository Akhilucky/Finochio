from app import db, app

with app.app_context():
    db.create_all()  # Create tables
    print("Tables created successfully!")