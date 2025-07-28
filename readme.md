Fullstack Note App
A fullstack web application built with NestJS (backend), React (frontend), and PostgreSQL (database) to manage notes with tagging and archiving features.

Features

Add Notes: Create notes with titles, content, and optional tags.
View Notes: Display all active notes or filter by tags.
Archive Notes: Archive notes to hide them from the active list, with an option to view archived notes.
Unarchive Notes: Restore archived notes to the active list.
Delete Notes: Permanently remove notes.
Tag Filtering: Filter notes by specific tags (e.g., "work", "personal").
Page Refresh: The page refreshes automatically after adding a new note.
Responsive Design: Styled with Tailwind CSS for a clean, mobile-friendly interface.

Technologies Used

Backend: NestJS with TypeScript, TypeORM for database interaction.
Frontend: React with JSX, Axios for API calls, Tailwind CSS for styling.
Database: PostgreSQL for persistent storage.
Version Control: Git and GitHub for source code management.

Prerequisites

Node.js and npm installed.
PostgreSQL installed and running.
Git installed for version control.

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

Update DB_PASSWORD with your PostgreSQL password.

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

Or use the provided ./run.sh script if configured.

Access the App:

Open http://localhost:3000 in your browser.

Usage

Add a note by filling out the form and submitting.
Use the tag dropdown to filter notes by tag.
Archive a note with the "Archive" button; view archived notes with the "Show Archived" toggle.
Unarchive a note with the "Unarchive" button.
Delete notes permanently with the "Delete" button.
The page refreshes after adding a new note.

Development

Make changes in the backend/src and frontend/src directories.
Commit and push changes to GitHub:git add .
git commit -m "Describe your changes"
git pull origin main
git push origin main

Contributing
Feel free to fork this repository, make improvements, and submit pull requests. Issues and feature requests are welcome!
License
[Add your license here, e.g., MIT] - Update this section if you have a specific license.
Acknowledgments

Built with guidance from xAI's Grok 3.
