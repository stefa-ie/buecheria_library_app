#!/bin/bash

# Setup script for backend dependencies
# This creates a virtual environment and installs all required packages

echo "Setting up backend environment..."

# Create virtual environment if it doesn't exist
if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment
echo "Activating virtual environment..."
source venv/bin/activate

# Install dependencies
echo "Installing dependencies from requirements.txt..."
pip install --upgrade pip
pip install -r ../requirements.txt

echo "Setup complete! To activate the virtual environment in the future, run:"
echo "  source venv/bin/activate"
echo ""
echo "Then you can run the backend with:"
echo "  uvicorn app:app --reload"
