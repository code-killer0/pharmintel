#!/bin/bash

# Check if .env exists in backend
if [ ! -f "backend/.env" ]; then
    echo "⚠️  WARNING: backend/.env file not found!"
    echo "Creating from .env.example..."
    cp backend/.env.example backend/.env
    echo "Please edit backend/.env and add your GOOGLE_API_KEY."
    read -p "Press Enter to continue setup (or Ctrl+C to abort and add key)..."
fi

# Start Backend
echo "🚀 Starting Backend on port 8000..."
cd backend
# Run in background
uvicorn app.main:app --reload &
BACKEND_PID=$!
cd ..

# Wait a moment for backend to initialize
sleep 3

# Start Frontend
echo "🚀 Starting Frontend on port 3000..."
cd frontend
npm run dev

# Cleanup on exit
kill $BACKEND_PID
