# cPanel Deployment Guide

## Step 1: Prepare Your App for Production

1. **Build the React app:**
   ```bash
   cd client
   npm run build
   cd ..
   ```

2. **Update server.js for production:**
   ```javascript
   // Add this line after the middleware setup
   app.use(express.static(path.join(__dirname, 'client/build')));
   
   // Add this route to serve React app
   app.get('*', (req, res) => {
     res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
   });
   ```

## Step 2: Upload to cPanel

1. **Create a ZIP file** of your project (excluding node_modules)
2. **Upload to cPanel** via File Manager
3. **Extract the ZIP** in your public_html or a subdirectory

## Step 3: Install Dependencies on cPanel

1. **SSH into your cPanel** or use Terminal in cPanel
2. **Navigate to your project directory**
3. **Install dependencies:**
   ```bash
   npm install --production
   ```

## Step 4: Configure Environment

1. **Create .env file** on cPanel:
   ```env
   PORT=5000
   SOCIAL_MANAGER_WEBHOOK=https://socialmanager.ge/webhook/other/
   API_KEY=your-api-key-here
   NODE_ENV=production
   ```

## Step 5: Start the Application

1. **Use PM2 or similar process manager:**
   ```bash
   npm install -g pm2
   pm2 start server.js --name "custom-messenger"
   pm2 startup
   pm2 save
   ```

## Step 6: Update Social Manager Configuration

**Webhook URL:** `https://yourdomain.com:5000/webhook/receive`

## Alternative: Use a Subdomain

1. **Create subdomain** in cPanel (e.g., messenger.yourdomain.com)
2. **Point to your app directory**
3. **Update webhook URL:** `https://messenger.yourdomain.com/webhook/receive`
