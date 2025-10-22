# AI-Powered Blogging Platform

This is a full-stack web application built as a college project. It features a Python (Flask) backend, a React frontend, and a MongoDB database. The platform allows users to register, log in, create, and view blog posts, with integrated AI features for content enhancement.

## Features

* **Full User Authentication:** Secure user registration and login system.
* **Post Management:** Users can create, read, and manage their own blog posts.
* **Live Database:** All data is stored and retrieved in real-time from a cloud-based MongoDB Atlas database.
* **React Frontend:** A modern, component-based single-page application (SPA) for a smooth user experience.
* **AI Content Tools (Demonstration Mode):**
    * AI-powered text summarization.
    * Content polishing for structure and clarity.
    * Spelling and grammar correction.

## Tech Stack

* **Backend:** Python, Flask, PyMongo
* **Frontend:** React (with Vite), CSS3
* **Database:** MongoDB Atlas

---

## Project Status: Demonstration Version

This repository contains a **demonstration version** of the application, specifically configured for a college project presentation.

The core full-stack functionality, including user authentication and the live database connection, is fully operational.

However, the live connections to external Generative AI APIs have been replaced with **mocked endpoints** in the backend. This was a strategic decision for two main reasons:
1.  **Reliability:** To ensure a fast, consistent, and reliable demonstration that is not dependent on the variable response times of external APIs.
2.  **Cost and Quota Management:** To bypass the strict rate limits, request size limitations, and potential costs associated with the free tiers of powerful AI models.

Additionally, the application is designed to run on the free tier of MongoDB Atlas, which has a data storage limit of 512 MB.

---

## Local Setup and Installation

To run this project on your local machine, you will need two terminal windows.

**1. Backend Setup:**

```bash
# Navigate to the backend folder
cd backend

# Create and activate a virtual environment
python3 -m venv venv
source venv/bin/activate

# Install the required packages
pip install -r requirements.txt

# Create a .env file and add your MongoDB URI
# MONGODB_URI="your_mongodb_connection_string"

# Run the backend server
python3 app.py
```


**2. Frontend Setup:**

```bash
# Navigate to the frontend folder
cd frontend

# Install the required packages
npm install

# Run the frontend development server
npm run dev
```

*Created by Deepak Battula*