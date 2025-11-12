#!/bin/bash

echo "🚀 Mahir Kitab Gundul - Vercel Deployment Setup"
echo ""

# Check if .env exists
if [ -f .env ]; then
    echo "✅ .env file found"
else
    echo "⚠️  .env file not found. Creating from template..."
    cp .env.example .env
    echo "📝 Please edit .env file and add your credentials:"
    echo "   - GEMINI_API_KEY"
    echo "   - VITE_SUPABASE_URL"
    echo "   - VITE_SUPABASE_ANON_KEY"
    echo ""
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

echo ""
echo "✨ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Edit .env file with your credentials"
echo "2. Run 'npm run dev' to test locally"
echo "3. Push to GitHub and import to Vercel"
echo "4. Set environment variables in Vercel Dashboard"
echo ""
echo "📖 Read DEPLOYMENT.md for detailed instructions"
