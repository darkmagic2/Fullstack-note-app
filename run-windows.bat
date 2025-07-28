@echo off
setlocal EnableDelayedExpansion

echo Starting Fullstack Note App setup on Windows...

:: Navigate to backend and create .env if it doesn't exist
echo Setting up backend configuration...
cd backend
if not exist ".env" (
  echo DB_HOST=localhost > .env
  echo DB_PORT=5432 >> .env
  echo DB_NAME=note_app >> .env
  echo DB_USER=postgres >> .env
  echo DB_PASSWORD=your_password >> .env
  echo .env file created in backend. Please update DB_PASSWORD with your PostgreSQL password.
) else (
  echo .env file already exists, skipping creation.
)

:: Build and start backend in a new window
echo Building backend...
call npm install >nul 2>&1
if %errorlevel% neq 0 (
  echo Error: Failed to install backend dependencies!
  exit /b 1
)
call npm run build
if %errorlevel% neq 0 (
  echo Error: Failed to build backend!
  exit /b 1
)
start cmd /k "npm start"
echo Backend built and started in a new window. Check the new terminal for logs.
cd ..

:: Start frontend
echo Starting frontend...
cd frontend
call npm install >nul 2>&1
if %errorlevel% neq 0 (
  echo Error: Failed to install frontend dependencies!
  exit /b 1
)
call npm start
echo Frontend started. Open http://localhost:3000

exit /b 0