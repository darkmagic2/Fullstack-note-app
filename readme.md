Note App

A simple note-taking application built with React for the frontend, Node.js/Express for the backend, and styled with Tailwind CSS. Users can create notes, add tags, and filter notes by tags.

Features

Add new notes with a title, content, and optional tag.

View all notes with their associated tags.

Filter notes by tag.

Modern, responsive UI with Tailwind CSS styling.

Prerequisites

Node.js (v14.x or later recommended)

npm (comes with Node.js)

Note: No database (e.g., PostgreSQL) is required to run the app in its current form. Data is stored in-memory and will reset on server restart. For persistent storage, see the "Optional Database Setup" section below.

Installation

Backend Setup

Navigate to the backend directory:

cd backend

Install dependencies:

npm install

Start the backend server:

npm start

The server will run on http://localhost:3001.

Frontend Setup

Navigate to the frontend directory:

cd frontend

Install dependencies:

npm install

Start the frontend development server:

npm start

The app will open in your browser at http://localhost:3000.

Using the Provided Script

Alternatively, run the project with a single command from the root note-app directory:

./run.sh

This script starts both the backend and frontend concurrently.

Optional Database Setup

The current version uses an in-memory data store, meaning data is lost when the server restarts. To add persistent storage with PostgreSQL:

Install PostgreSQL on your system.

Configure the backend to connect to PostgreSQL (e.g., update backend/index.js with a database client like pg and connection details).

Update the API routes to interact with the database instead of in-memory storage.

Note: This step is optional and not required for basic usage. See the "Contributing" section for help with implementation.

Usage

Open http://localhost:3000 in your browser.

Use the form to add a new note:

Enter a title and content.

Optionally add a tag (e.g., "work", "personal").

Click "Add Note" to save.

View all notes in the list below the form.

Use the dropdown to select a tag and click "Filter" to see notes with that tag.

Notes are styled with a modern design, including hover effects and responsive layout.

Project Structure

backend/: Contains the Express server and API routes.

frontend/: Contains the React application.

src/: Source code for React components.

src/index.css: Tailwind CSS configuration file.

src/App.js: Main React component.

src/components/NoteForm.js: Component for adding notes.

Dependencies

Frontend: React, React DOM, Axios, Tailwind CSS, CRACO.

Backend: Express, Axios.

Troubleshooting

Blank Screen: Ensure both backend and frontend are running. Check the console (F12) for errors.

Styling Issues: Verify index.css is imported in index.js and Tailwind is configured via craco.config.js.

API Errors: Ensure the backend is running on http://localhost:3001.

Contributing

Feel free to fork this repository, make improvements, and submit pull requests. Issues and feature requests are welcome! For adding PostgreSQL or other enhancements, please open an issue or pull request with details.

License

This project is open-source. See the LICENSE file for details (if applicable).

After cloning the repo, run:
cd backend
npm install
cd ../frontend
npm install
