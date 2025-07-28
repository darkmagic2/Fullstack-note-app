Fullstack Note App
A fullstack web application built with NestJS (backend), React (frontend), and PostgreSQL (database) to manage notes with tagging, archiving, and editing features.
Features

Add Notes: Create notes with titles, content, and optional tags.
View Notes: Display all active notes or filter by tags.
Archive Notes: Archive notes to hide them from the active list, with an option to view archived notes.
Unarchive Notes: Restore archived notes to the active list.
Delete Notes: Permanently remove notes.
Edit Notes: Edit existing notes, including title, content, and tags.
Tag Filtering: Filter notes by specific tags (e.g., "work", "personal").
Page Refresh: The page refreshes automatically after adding a new note.
Responsive Design: Styled with Tailwind CSS for a clean, mobile-friendly interface.

Technologies Used

Backend: NestJS with TypeScript, TypeORM for database interaction.
Frontend: React with JSX, Axios for API calls, Tailwind CSS for styling.
Database: PostgreSQL for persistent storage.
Version Control: Git and GitHub for source code management.

Prerequisites
The following runtimes, engines, and tools are required to run the application, with their specific versions:

Node.js: v18.17.0  
Used for running both backend (NestJS) and frontend (React) applications.

npm: v9.6.7  
Package manager for installing dependencies (aligned with Node.js 18.17.0).

PostgreSQL: v15.4  
Database engine for storing notes (ensure the note_app database is created).

Git: v2.39.2  
Version control for cloning and managing the repository.

Notes

Versions listed are the minimum recommended. Check package.json in the backend and frontend directories for exact dependency versions.
Install Node.js and npm from nodejs.org or via package managers (e.g., sudo apt install nodejs npm on Debian-based Linux).
Install PostgreSQL from postgresql.org or via package managers (e.g., sudo apt install postgresql on Linux).
Install Git from git-scm.com or via package managers (e.g., sudo apt install git on Linux).

Installation

Clone the Repository:
git clone https://github.com/darkmagic2/Fullstack-note-app.git
cd Fullstack-note-app

Set Up Environment:

Create a .env file in the backend directory with:DB_HOST=localhost
DB_PORT=5432
DB_NAME=note_app
DB_USER=postgres
DB_PASSWORD=your_password

Update DB_PASSWORD with your PostgreSQL password. The run-linux.sh or run-windows.bat script will create this file with defaults if it’s missing.

Install Dependencies:

Backend:cd backend
npm install

Frontend:cd ../frontend
npm install

Set Up Database:

Create the note_app database in PostgreSQL:CREATE DATABASE note_app;

The app will auto-create the notes table on startup with synchronize: true.

Run the Application:

Build and start the backend:cd backend
npm run build
npm start

Start the frontend (with Tailwind watch):cd ../frontend
npm start

Or use the provided scripts for automation (see below).

Access the App:

Open http://localhost:3000 in your browser.

Running the App
Use the appropriate script based on your operating system to automate the build, startup process, and configuration:

Linux:
chmod +x run-linux.sh
./run-linux.sh

Windows:
run-windows.bat

Both scripts build the backend, start it, launch the frontend, and create a .env file in the backend directory if it doesn’t exist (with default values). Update the DB_PASSWORD in .env with your PostgreSQL password. Open http://localhost:3000 to use the app. Ensure Node.js, npm, and PostgreSQL are installed and running with the specified versions.
Usage

Add a note by filling out the form and submitting.
Use the tag dropdown to filter notes by tag.
Archive a note with the "Archive" button; view archived notes with the "Show Archived" toggle.
Unarchive a note with the "Unarchive" button.
Delete notes permanently with the "Delete" button.
Edit a note by clicking the "Edit" button, modify the fields, and click "Update Note" to save changes.
The page refreshes after adding a new note.

Development

Make changes in the backend/src and frontend/src directories.
Commit and push changes to GitHub:git add .
git commit -m "Describe your changes"
git pull origin main
git push origin main
