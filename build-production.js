const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Building Custom Messenger for Production...\n');

try {
  // Step 1: Build React app
  console.log('📦 Building React app...');
  execSync('cd client && npm run build', { stdio: 'inherit' });
  console.log('✅ React app built successfully\n');

  // Step 2: Create production package.json
  console.log('📝 Creating production package.json...');
  const packageJson = {
    name: "custom-messenger",
    version: "1.0.0",
    description: "Custom Messenger App for Social Manager Integration",
    main: "server.js",
    scripts: {
      start: "node server.js"
    },
    dependencies: {
      "express": "^4.18.2",
      "cors": "^2.8.5",
      "body-parser": "^1.20.2",
      "dotenv": "^16.3.1",
      "socket.io": "^4.7.2",
      "axios": "^1.5.0",
      "uuid": "^9.0.0"
    },
    keywords: ["messenger", "social-manager", "webhook", "chat"],
    author: "Your Name",
    license: "MIT"
  };

  fs.writeFileSync('package-production.json', JSON.stringify(packageJson, null, 2));
  console.log('✅ Production package.json created\n');

  // Step 3: Create deployment instructions
  console.log('📋 Creating deployment instructions...');
  const deploymentInstructions = `# Production Deployment Instructions

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
   \`\`\`bash
   npm install --production
   \`\`\`
5. **Configure .env file:**
   \`\`\`env
   PORT=5000
   SOCIAL_MANAGER_WEBHOOK=https://socialmanager.ge/webhook/other/
   API_KEY=your-api-key-here
   NODE_ENV=production
   \`\`\`
6. **Start the app:**
   \`\`\`bash
   npm start
   \`\`\`

## Social Manager Configuration:

**Webhook URL:** https://yourdomain.com:5000/webhook/receive

## Alternative: Use PM2 for Process Management:

\`\`\`bash
npm install -g pm2
pm2 start server.js --name "custom-messenger"
pm2 startup
pm2 save
\`\`\`
`;

  fs.writeFileSync('DEPLOYMENT.md', deploymentInstructions);
  console.log('✅ Deployment instructions created\n');

  console.log('🎉 Production build completed!');
  console.log('\n📁 Files ready for deployment:');
  console.log('  - server.js');
  console.log('  - package-production.json (rename to package.json)');
  console.log('  - client/build/ (entire folder)');
  console.log('  - DEPLOYMENT.md (deployment instructions)');
  console.log('\n📋 Next steps:');
  console.log('  1. Upload files to cPanel');
  console.log('  2. Follow DEPLOYMENT.md instructions');
  console.log('  3. Update Social Manager webhook URL');

} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}
