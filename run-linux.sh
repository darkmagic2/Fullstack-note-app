#!/bin/bash

# Exit on any error
set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Starting Fullstack Note App setup on Linux...${NC}"

# Navigate to backend and create .env if it doesn't exist
echo -e "${YELLOW}Setting up backend configuration...${NC}"
cd backend || { echo -e "${RED}Error: backend directory not found!${NC}"; exit 1; }
if [ ! -f ".env" ]; then
  echo -e "DB_HOST=localhost\nDB_PORT=5432\nDB_NAME=note_app\nDB_USER=postgres\nDB_PASSWORD=your_password" > .env
  echo -e "${GREEN}.env file created in backend. Please update DB_PASSWORD with your PostgreSQL password.${NC}"
else
  echo -e "${YELLOW}.env file already exists, skipping creation.${NC}"
fi

# Build and start backend
echo -e "${YELLOW}Building backend...${NC}"
npm install > /dev/null 2>&1 || { echo -e "${RED}Error: Failed to install backend dependencies!${NC}"; exit 1; }
npm run build || { echo -e "${RED}Error: Failed to build backend!${NC}"; exit 1; }
npm start &> backend.log &
BACKEND_PID=$!
echo -e "${GREEN}Backend built and started (PID: $BACKEND_PID). Log: backend.log${NC}"
cd ..

# Navigate to frontend and start
echo -e "${YELLOW}Starting frontend...${NC}"
cd frontend || { echo -e "${RED}Error: frontend directory not found!${NC}"; exit 1; }
npm install > /dev/null 2>&1 || { echo -e "${RED}Error: Failed to install frontend dependencies!${NC}"; exit 1; }
npm start
echo -e "${GREEN}Frontend started. Open http://localhost:3000${NC}"

# Trap to kill backend on script exit
trap 'kill $BACKEND_PID 2>/dev/null; echo -e "${YELLOW}Backend process killed.${NC}"' EXIT