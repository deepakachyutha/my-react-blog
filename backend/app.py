import os
from flask import Flask, jsonify, request
from pymongo import MongoClient
from bson import json_util
from dotenv import load_dotenv
import certifi
from datetime import datetime
from flask_cors import CORS

load_dotenv()
app = Flask(__name__)
CORS(app)

MONGODB_URI = os.environ.get("MONGODB_URI")
client = MongoClient(MONGODB_URI, tlsCAFile=certifi.where())
db = client.get_database("bloging01") 

@app.route("/api/users", methods=['GET'])
def get_users():
    try:
        all_users = list(db.users.find({}))
        for user in all_users:
            user.pop("password", None)
            user['_id'] = str(user['_id'])
        return jsonify(all_users)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/api/posts", methods=['GET'])
def get_posts():
    try:
        posts = list(db.posts.find({}).sort("createdAt", -1))
        return json_util.dumps(posts)   
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route("/api/posts", methods=['POST'])
def create_post():
    try:
        post_data = request.get_json()
        post_data['createdAt'] = datetime.utcnow()
        result = db.posts.insert_one(post_data)
        created_post = db.posts.find_one({"_id": result.inserted_id})
        return json_util.dumps(created_post), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route("/api/register", methods=['POST'])
def register_user():
    try:
        user_data = request.get_json()
        existing_user = db.users.find_one({"$or": [{"email": user_data.get("email")}, {"username": user_data.get("username")}]})
        if existing_user:
            return jsonify({"error": "User with this email or username already exists"}), 409
        result = db.users.insert_one(user_data)
        created_user = db.users.find_one({"_id": result.inserted_id})
        created_user.pop("password", None)
        created_user['_id'] = str(created_user['_id'])
        return jsonify(created_user), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route("/api/login", methods=['POST'])
def login_user():
    try:
        login_data = request.get_json()
        email = login_data.get("email")
        password = login_data.get("password")
        user = db.users.find_one({"email": email})

        if user and user.get("password") == password:
            user.pop("password", None)
            user['_id'] = str(user['_id'])
            return jsonify(user)
        else:
            return jsonify({"error": "Invalid email or password"}), 401
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/api/spellcheck", methods=['POST'])
def spellcheck_text():
    content = request.get_json().get('content', '')
    corrected_text = content + "\n\n[AI spell check successful! This is a mocked response.]"
    return jsonify({"correctedText": corrected_text})

@app.route("/api/polish", methods=['POST'])
def polish_text():
    content = request.get_json().get('content', '')
    polished_text = "[This is a mocked AI response for polishing.]\n\n" + content
    return jsonify({"polishedText": polished_text})
    
@app.route("/api/summarize", methods=['POST'])
def summarize_text():
    summary = "This is a mocked summary of the blog post, returned instantly from the server for a reliable demonstration."
    return jsonify({"summary": summary})

if __name__ == '__main__':
    app.run(debug=True, port=8080)