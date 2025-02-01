import os
import mimetypes
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from dotenv import load_dotenv
from pymongo import MongoClient

# Ensure JavaScript files are served with the correct MIME type
mimetypes.add_type("application/javascript", ".js")

# Load environment variables
load_dotenv()
MONGO_URI = os.getenv("MONGO_URI")

# Initialize Flask App and allow serving static files (React frontend)
app = Flask(__name__, static_folder="../web/dist", static_url_path="/")

# Enable CORS to allow frontend communication
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})

# Connect to MongoDB
client = MongoClient(MONGO_URI)
db = client["homeAssignment"]
users_collection = db["users"]  # Naming convention: lowercase with underscores

@app.before_request
def log_request():
    print(f"Incoming request: {request.method} {request.path}")

@app.route("/login", methods=["POST"])
def login():
    """Handles user login and saves credentials to MongoDB."""
    data = request.json
    if not data:
        return jsonify({"error": "No input data provided"}), 400

    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"error": "Email and password are required"}), 400

    users_collection.insert_one({"email": email, "password": password})
    return jsonify({"message": "User created & logged in"}), 201


@app.route("/", methods=["GET"])
def index():
    """Serves the React frontend from the dist folder."""
    return send_from_directory(app.static_folder, "index.html")


if __name__ == "__main__":
    # Get the port from Azure environment variables or use default 8000
    port = int(os.environ.get("PORT", 8000))
    app.run(host="0.0.0.0", port=port, debug=True)
