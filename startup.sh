#!/bin/bash

# Startup script for Azure Web App - Next.js Application
echo "Starting UrSafeSpace Next.js application..."

# Set environment variables
export NODE_ENV=production
export PORT=${PORT:-8080}

# Log environment info
echo "Node.js version: $(node --version)"
echo "npm version: $(npm --version)"
echo "PORT: $PORT"
echo "NODE_ENV: $NODE_ENV"

# Navigate to the application directory
cd /home/site/wwwroot

# Check if package.json exists
if [ ! -f "package.json" ]; then
    echo "Error: package.json not found in /home/site/wwwroot"
    exit 1
fi

# Check if .next directory exists
if [ ! -d ".next" ]; then
    echo "Error: .next directory not found. Running npm run build..."
    npm run build
fi

# Check if server.js exists
if [ ! -f "server.js" ]; then
    echo "Error: server.js not found"
    exit 1
fi

# Install production dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm ci --only=production
fi

# Start the application
echo "Starting Next.js server on port $PORT..."
exec node server.js
