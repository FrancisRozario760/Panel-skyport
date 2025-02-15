#!/bin/bash

# Configuration
EMAIL="benedickrozario04@gmail.com"
PROJECT_NAME="skyport-panel"
GIT_REPO="https://github.com/SkyportPanel/SkyportPanel.git"

# Skyport Panel Credentials
USERNAME="crashop"
PASSWORD="Boss@273"

# Install Vercel CLI if not installed
if ! command -v vercel &> /dev/null; then
    echo "Installing Vercel CLI..."
    npm install -g vercel
fi

# Login to Vercel (email verification required)
echo "Logging into Vercel..."
vercel login

# Clone Skyport Panel if not already present
if [ ! -d "$PROJECT_NAME" ]; then
    echo "Cloning Skyport Panel..."
    git clone $GIT_REPO $PROJECT_NAME
fi

# Navigate to project directory
cd $PROJECT_NAME

# Install dependencies
echo "Installing dependencies..."
npm install

# Link the project to Vercel automatically
echo "Linking project to Vercel..."
vercel link --project $PROJECT_NAME --confirm

# Set environment variables
echo "Setting environment variables..."
vercel env add USERNAME "$USERNAME" --yes
vercel env add PASSWORD "$PASSWORD" --yes

# Deploy to Vercel without prompts
echo "Deploying to Vercel..."
vercel --prod --yes

echo "✅ Skyport Panel has been successfully deployed to Vercel!"
