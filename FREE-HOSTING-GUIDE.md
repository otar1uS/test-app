# 🚀 Free Hosting Guide for Custom Messenger

## 🎯 **Recommended: Render (Easiest)**

### **Step 1: Prepare Your Code**
1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/custom-messenger.git
   git push -u origin main
   ```

### **Step 2: Deploy to Render**
1. **Go to:** https://render.com
2. **Sign up** with GitHub
3. **Click:** "New +" → "Web Service"
4. **Connect** your GitHub repository
5. **Configure:**
   - **Name:** `custom-messenger`
   - **Environment:** `Node`
   - **Build Command:** `npm install && cd client && npm install && npm run build`
   - **Start Command:** `npm start`
6. **Environment Variables:**
   ```
   NODE_ENV=production
   PORT=10000
   SOCIAL_MANAGER_WEBHOOK=https://socialmanager.ge/webhook/other/
   API_KEY=your-api-key-here
   ```
7. **Click:** "Create Web Service"

### **Step 3: Get Your URL**
- Your app will be available at: `https://custom-messenger.onrender.com`
- Webhook URL: `https://custom-messenger.onrender.com/webhook/receive`

---

## ⚡ **Alternative: Railway (Fastest)**

### **Step 1: Deploy to Railway**
1. **Go to:** https://railway.app
2. **Sign up** with GitHub
3. **Click:** "New Project" → "Deploy from GitHub repo"
4. **Select** your repository
5. **Railway will auto-detect** and deploy

### **Step 2: Configure Environment**
1. **Go to:** Variables tab
2. **Add:**
   ```
   NODE_ENV=production
   SOCIAL_MANAGER_WEBHOOK=https://socialmanager.ge/webhook/other/
   API_KEY=your-api-key-here
   ```

### **Step 3: Get Your URL**
- Your app will be available at: `https://your-app-name.railway.app`
- Webhook URL: `https://your-app-name.railway.app/webhook/receive`

---

## 🌐 **Alternative: Vercel (Best for React)**

### **Step 1: Deploy to Vercel**
1. **Go to:** https://vercel.com
2. **Sign up** with GitHub
3. **Click:** "New Project"
4. **Import** your repository
5. **Configure:**
   - **Framework Preset:** Node.js
   - **Build Command:** `npm install && cd client && npm install && npm run build`
   - **Output Directory:** `client/build`
6. **Click:** "Deploy"

### **Step 2: Configure Environment**
1. **Go to:** Settings → Environment Variables
2. **Add:**
   ```
   NODE_ENV=production
   SOCIAL_MANAGER_WEBHOOK=https://socialmanager.ge/webhook/other/
   API_KEY=your-api-key-here
   ```

### **Step 3: Get Your URL**
- Your app will be available at: `https://your-app-name.vercel.app`
- Webhook URL: `https://your-app-name.vercel.app/webhook/receive`

---

## 🔧 **Update Social Manager Configuration**

Once deployed, update your Social Manager settings:

**Platform Type:** `Custom Messenger`

**Platform ID:** `custom_messenger_001`

**Display Name:** `My Custom Messenger App`

**Webhook URL:** `https://your-app-name.onrender.com/webhook/receive`
- Replace with your actual deployed URL

**Access Token / API Key:** Leave empty

**Webhook Secret / API Key:** Leave empty

---

## 📊 **Hosting Comparison**

| Platform | Free Tier | Speed | Ease | HTTPS | Custom Domain |
|----------|-----------|-------|------|-------|---------------|
| **Render** | 750h/month | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ✅ | ✅ |
| **Railway** | $5/month | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ✅ | ✅ |
| **Vercel** | Unlimited | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ✅ | ✅ |
| **Netlify** | Unlimited | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ✅ | ✅ |

---

## 🎯 **Quick Start (Recommended)**

1. **Choose Render** (easiest)
2. **Push code to GitHub**
3. **Deploy with one click**
4. **Update Social Manager webhook URL**
5. **Test your messenger!**

---

## 🆘 **Need Help?**

- **Render:** https://render.com/docs
- **Railway:** https://docs.railway.app
- **Vercel:** https://vercel.com/docs

All platforms offer excellent documentation and support!
