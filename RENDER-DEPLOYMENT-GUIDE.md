# 🚀 Render Deployment Guide for Custom Messenger

## 📋 **Prerequisites**
- ✅ Git repository initialized (DONE)
- ✅ Code committed (DONE)
- ✅ GitHub account
- ✅ Render account

---

## 🎯 **Step 1: Push to GitHub**

### **1.1 Create GitHub Repository**
1. Go to: https://github.com
2. Click "New repository"
3. Name: `custom-messenger`
4. Make it **Public** (for free Render deployment)
5. **Don't** initialize with README (we already have one)
6. Click "Create repository"

### **1.2 Push Your Code**
```bash
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/custom-messenger.git
git push -u origin main
```

---

## 🌐 **Step 2: Deploy to Render**

### **2.1 Sign Up for Render**
1. Go to: https://render.com
2. Click "Get Started"
3. Sign up with your **GitHub account**
4. Complete the signup process

### **2.2 Create New Web Service**
1. In Render dashboard, click **"New +"**
2. Select **"Web Service"**
3. Click **"Connect account"** next to GitHub
4. Select your `custom-messenger` repository

### **2.3 Configure the Service**
Fill in these settings:

**Basic Settings:**
- **Name:** `custom-messenger`
- **Environment:** `Node`
- **Region:** Choose closest to you
- **Branch:** `main`

**Build & Deploy:**
- **Build Command:** `npm install && cd client && npm install && npm run build`
- **Start Command:** `npm start`

**Environment Variables:**
Click "Advanced" and add these variables:
```
NODE_ENV=production
PORT=10000
SOCIAL_MANAGER_WEBHOOK=https://socialmanager.ge/webhook/other/
API_KEY=your-api-key-here
```

### **2.4 Deploy**
1. Click **"Create Web Service"**
2. Render will start building your app
3. Wait 2-3 minutes for deployment to complete

---

## ✅ **Step 3: Get Your URLs**

Once deployment is complete, you'll get:

**Your App URL:** `https://custom-messenger.onrender.com`
**Webhook URL:** `https://custom-messenger.onrender.com/webhook/receive`

---

## 🔧 **Step 4: Update Social Manager**

Go to your Social Manager platform and update:

**Platform Type:** `Custom Messenger`
**Platform ID:** `custom_messenger_001`
**Display Name:** `My Custom Messenger App`
**Webhook URL:** `https://custom-messenger.onrender.com/webhook/receive`
**Access Token / API Key:** Leave empty
**Webhook Secret / API Key:** Leave empty

---

## 🧪 **Step 5: Test Your App**

1. **Visit your app:** https://custom-messenger.onrender.com
2. **Test messaging:** Send a message from the interface
3. **Test webhook:** Use the "Test Webhook" button
4. **Check Social Manager:** Verify messages appear in your dashboard

---

## 🔄 **Step 6: Auto-Deploy (Optional)**

Every time you push changes to GitHub, Render will automatically redeploy your app!

```bash
# Make changes to your code
git add .
git commit -m "Update messenger app"
git push origin main
# Render will automatically redeploy!
```

---

## 🛠️ **Troubleshooting**

### **Build Fails**
- Check the build logs in Render dashboard
- Ensure all dependencies are in `package.json`
- Verify the build command is correct

### **App Won't Start**
- Check the start command: `npm start`
- Verify the PORT environment variable
- Check the logs in Render dashboard

### **Webhook Not Working**
- Verify the webhook URL is correct
- Check that your app is running (green status in Render)
- Test the webhook endpoint manually

### **Messages Not Sending**
- Check the Social Manager webhook URL
- Verify your API key is correct
- Check the server logs in Render dashboard

---

## 📊 **Render Dashboard Features**

- **Logs:** View real-time application logs
- **Metrics:** Monitor performance and usage
- **Environment Variables:** Manage configuration
- **Deployments:** View deployment history
- **Health Checks:** Monitor app status

---

## 💰 **Free Tier Limits**

- **750 hours/month** (enough for 24/7 usage)
- **512 MB RAM**
- **Shared CPU**
- **Automatic HTTPS**
- **Custom domains supported**

---

## 🎉 **Success!**

Your Custom Messenger app is now:
- ✅ **Hosted for free** on Render
- ✅ **Publicly accessible** via HTTPS
- ✅ **Auto-deploying** from GitHub
- ✅ **Ready for Social Manager integration**

---

## 🆘 **Need Help?**

- **Render Docs:** https://render.com/docs
- **Render Support:** https://render.com/support
- **GitHub Issues:** Create an issue in your repository

---

## 📱 **Next Steps**

1. **Test your app** thoroughly
2. **Configure Social Manager** with the webhook URL
3. **Monitor the logs** for any issues
4. **Share your app** with others!

**Your app is live at:** `https://custom-messenger.onrender.com`
