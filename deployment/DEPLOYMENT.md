# Production Deployment Instructions

## Files to Upload to cPanel:

1. **server.js** - Main server file
2. **package-production.json** - Rename to package.json
3. **client/build/** - Entire build folder
4. **env.example** - Rename to .env and configure

## Steps:

1. **Upload files** to your cPanel directory
2. **SSH into cPanel** or use Terminal
3. **Navigate to your directory**
4. **Install dependencies:**
   ```bash
   npm install --production
   ```
5. **Configure .env file:**
   ```env
   PORT=5000
   SOCIAL_MANAGER_WEBHOOK=https://socialmanager.ge/webhook/other/
   API_KEY=your-api-key-here
   NODE_ENV=production
   ```
6. **Start the app:**
   ```bash
   npm start
   ```

## Social Manager Configuration:

**Webhook URL:** https://yourdomain.com:5000/webhook/receive

## Alternative: Use PM2 for Process Management:

```bash
npm install -g pm2
pm2 start server.js --name "custom-messenger"
pm2 startup
pm2 save
```
