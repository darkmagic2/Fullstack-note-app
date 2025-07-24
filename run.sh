#!/bin/bash
# Shell script to start both backend and frontend applications

# Trap Ctrl+C to kill background processes
trap 'kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; exit 0' INT

# Navigate to backend folder
cd backend || { echo "Failed to enter backend directory"; exit 1; }

# Install dependencies only if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
  npm install || { echo "Failed to install backend dependencies"; exit 1; }
fi

# Start backend in background and capture PID
npm run start:dev &
BACKEND_PID=$!

# Navigate to frontend folder
cd ../frontend || { echo "Failed to enter frontend directory"; exit 1; }

# Install dependencies only if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
  npm install || { echo "Failed to install frontend dependencies"; exit 1; }
fi

# Start frontend in background and capture PID
npm start &
FRONTEND_PID=$!

# Wait for any process to exit
wait