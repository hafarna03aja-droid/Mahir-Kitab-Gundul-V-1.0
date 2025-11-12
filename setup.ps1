# Quick Setup Script for Vercel Deployment

Write-Host "🚀 Mahir Kitab Gundul - Vercel Deployment Setup" -ForegroundColor Green
Write-Host ""

# Check if .env exists
if (Test-Path .env) {
    Write-Host "✅ .env file found" -ForegroundColor Green
} else {
    Write-Host "⚠️  .env file not found. Creating from template..." -ForegroundColor Yellow
    Copy-Item .env.example .env
    Write-Host "📝 Please edit .env file and add your credentials:" -ForegroundColor Cyan
    Write-Host "   - GEMINI_API_KEY" -ForegroundColor Yellow
    Write-Host "   - VITE_SUPABASE_URL" -ForegroundColor Yellow
    Write-Host "   - VITE_SUPABASE_ANON_KEY" -ForegroundColor Yellow
    Write-Host ""
}

# Install dependencies
Write-Host "📦 Installing dependencies..." -ForegroundColor Cyan
npm install

Write-Host ""
Write-Host "✨ Setup complete!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Edit .env file with your credentials" -ForegroundColor White
Write-Host "2. Run 'npm run dev' to test locally" -ForegroundColor White
Write-Host "3. Push to GitHub and import to Vercel" -ForegroundColor White
Write-Host "4. Set environment variables in Vercel Dashboard" -ForegroundColor White
Write-Host ""
Write-Host "📖 Read DEPLOYMENT.md for detailed instructions" -ForegroundColor Yellow
