# Medium Project

A web application that allows users to read, write, and share articles, similar to Medium.

## Features

1. **User Authentication** – Secure login and registration system.
2. **Article Management** – Create, edit, delete, and view articles.
3. **Rich Text Editor** – Write articles with formatting options.
4. **Responsive Design** – Optimized for both desktop and mobile devices.

## Technologies Used

- **Frontend**: React.js, CSS Modules  
- **Backend**: Node.js, Express.js  
- **Database**: MongoDB  
- **Authentication**: JWT (JSON Web Tokens)  
- **Rich Text Editor**: Draft.js  

## Installation and Setup

Follow these steps to set up and run the project locally:

### 1️ Clone the repository

 bash
git clone https://github.com/kasha2217/medium_project.git
cd medium_project


### 2 Install dependencies 
# For backend
cd backend
npm install

# For frontend
cd ../frontend
npm install


### 3 Setup environment variables 
Create a .env file in the backend directory and add:
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret

### 4 Start Application
# Start backend server
cd backend
npm start

# Start frontend development server
cd ../frontend
npm start
The frontend will be available at http://localhost:3000, and the backend will run at http://localhost:5000.

#Usage
Register a new account or login with existing credentials.
Create a new article using the rich text editor.
Edit or delete your articles from your profile.
Read articles from other users on the homepage.
