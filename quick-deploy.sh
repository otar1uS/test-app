#!/bin/bash

echo "🚀 Quick Deploy Script for Custom Messenger"
echo "=========================================="
echo ""

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo "❌ Git is not installed. Please install Git first."
    exit 1
fi

# Check if node is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

echo "✅ Prerequisites check passed!"
echo ""

# Initialize git if not already done
if [ ! -d ".git" ]; then
    echo "📦 Initializing Git repository..."
    git init
    git add .
    git commit -m "Initial commit"
    echo "✅ Git repository initialized!"
    echo ""
fi

echo "🎯 Choose your hosting platform:"
echo "1. Render (Recommended - Easiest)"
echo "2. Railway (Fastest)"
echo "3. Vercel (Best for React)"
echo "4. Show all options"
echo ""

read -p "Enter your choice (1-4): " choice

case $choice in
    1)
        echo ""
        echo "🚀 Deploying to Render..."
        echo ""
        echo "📋 Steps to follow:"
        echo "1. Go to: https://render.com"
        echo "2. Sign up with GitHub"
        echo "3. Click 'New +' → 'Web Service'"
        echo "4. Connect your GitHub repository"
        echo "5. Configure:"
        echo "   - Name: custom-messenger"
        echo "   - Environment: Node"
        echo "   - Build Command: npm install && cd client && npm install && npm run build"
        echo "   - Start Command: npm start"
        echo "6. Add environment variables:"
        echo "   - NODE_ENV=production"
        echo "   - PORT=10000"
        echo "   - SOCIAL_MANAGER_WEBHOOK=https://socialmanager.ge/webhook/other/"
        echo "   - API_KEY=your-api-key-here"
        echo "7. Click 'Create Web Service'"
        echo ""
        echo "🌐 Your app will be available at: https://custom-messenger.onrender.com"
        echo "📡 Webhook URL: https://custom-messenger.onrender.com/webhook/receive"
        ;;
    2)
        echo ""
        echo "⚡ Deploying to Railway..."
        echo ""
        echo "📋 Steps to follow:"
        echo "1. Go to: https://railway.app"
        echo "2. Sign up with GitHub"
        echo "3. Click 'New Project' → 'Deploy from GitHub repo'"
        echo "4. Select your repository"
        echo "5. Railway will auto-detect and deploy"
        echo "6. Add environment variables in the Variables tab:"
        echo "   - NODE_ENV=production"
        echo "   - SOCIAL_MANAGER_WEBHOOK=https://socialmanager.ge/webhook/other/"
        echo "   - API_KEY=your-api-key-here"
        echo ""
        echo "🌐 Your app will be available at: https://your-app-name.railway.app"
        echo "📡 Webhook URL: https://your-app-name.railway.app/webhook/receive"
        ;;
    3)
        echo ""
        echo "🌐 Deploying to Vercel..."
        echo ""
        echo "📋 Steps to follow:"
        echo "1. Go to: https://vercel.com"
        echo "2. Sign up with GitHub"
        echo "3. Click 'New Project'"
        echo "4. Import your repository"
        echo "5. Configure:"
        echo "   - Framework Preset: Node.js"
        echo "   - Build Command: npm install && cd client && npm install && npm run build"
        echo "   - Output Directory: client/build"
        echo "6. Click 'Deploy'"
        echo "7. Add environment variables in Settings → Environment Variables:"
        echo "   - NODE_ENV=production"
        echo "   - SOCIAL_MANAGER_WEBHOOK=https://socialmanager.ge/webhook/other/"
        echo "   - API_KEY=your-api-key-here"
        echo ""
        echo "🌐 Your app will be available at: https://your-app-name.vercel.app"
        echo "📡 Webhook URL: https://your-app-name.vercel.app/webhook/receive"
        ;;
    4)
        echo ""
        echo "📊 All Hosting Options:"
        echo ""
        echo "🎯 Render (Recommended):"
        echo "   - Free: 750 hours/month"
        echo "   - Speed: ⭐⭐⭐⭐"
        echo "   - Ease: ⭐⭐⭐⭐⭐"
        echo "   - URL: https://render.com"
        echo ""
        echo "⚡ Railway:"
        echo "   - Free: $5 credit/month"
        echo "   - Speed: ⭐⭐⭐⭐⭐"
        echo "   - Ease: ⭐⭐⭐⭐"
        echo "   - URL: https://railway.app"
        echo ""
        echo "🌐 Vercel:"
        echo "   - Free: Unlimited"
        echo "   - Speed: ⭐⭐⭐⭐⭐"
        echo "   - Ease: ⭐⭐⭐⭐"
        echo "   - URL: https://vercel.com"
        echo ""
        echo "📱 Netlify:"
        echo "   - Free: Unlimited"
        echo "   - Speed: ⭐⭐⭐⭐"
        echo "   - Ease: ⭐⭐⭐⭐"
        echo "   - URL: https://netlify.com"
        ;;
    *)
        echo "❌ Invalid choice. Please run the script again."
        exit 1
        ;;
esac

echo ""
echo "🎉 Deployment guide completed!"
echo ""
echo "📋 Next steps:"
echo "1. Follow the deployment steps above"
echo "2. Update Social Manager webhook URL"
echo "3. Test your messenger app"
echo ""
echo "📖 For detailed instructions, see: FREE-HOSTING-GUIDE.md"
echo "🆘 Need help? Check the platform's documentation!"
