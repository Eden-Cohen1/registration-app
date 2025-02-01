import os
from flask import Flask, request, jsonify
from flask_cors import CORS 
from dotenv import load_dotenv
from pymongo import MongoClient

load_dotenv()
MONGO_URI = os.getenv("MONGO_URI")

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}}) 

client = MongoClient(MONGO_URI)
db = client["homeAssignment"]
usersCollection = db["users"]



@app.route("/login", methods=["POST"])
def login():
    data = request.json
    if not data:
        return jsonify({"error": "No input data provided"}), 400

    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"error": "Email and password are required"}), 400
    
    usersCollection.insert_one({email : password})
    return jsonify({"message": "User created & logged in"}), 201


@app.route("/", methods=["GET"])
def index():
    return jsonify({"message": "Flask server is running"}), 200


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))  # Get the port from Azure
    app.run(host="0.0.0.0", port=port, debug=True)