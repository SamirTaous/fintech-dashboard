#!/bin/bash

echo "🏦 Setting up Asmas Bank Frontend Portfolio Demo"
echo "=============================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ Node.js and npm are installed"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully"
else
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo ""
echo "🚀 Setup complete! You can now run the application:"
echo ""
echo "   npm run dev:full    # Start both mock server and React app"
echo "   npm run dev         # Start only React app"
echo "   npm run mock-server # Start only mock server"
echo ""
echo "📱 The app will be available at: http://localhost:5173"
echo "🔧 Mock API will be available at: http://localhost:3001"
echo ""
echo "Demo credentials:"
echo "  Username: demo@asmasbank.com"
echo "  Password: any password"