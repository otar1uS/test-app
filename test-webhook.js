const axios = require('axios');

// Test configuration
const WEBHOOK_URL = 'http://localhost:5000/webhook/receive';
const SOCIAL_MANAGER_WEBHOOK = 'https://socialmanager.ge/webhook/other/';

// Test message
const testMessage = {
  sender_id: 'test_user_001',
  message: 'Hello from test script! This is a test message.',
  timestamp: new Date().toISOString()
};

async function testLocalWebhook() {
  console.log('🧪 Testing local webhook...');
  console.log('📡 URL:', WEBHOOK_URL);
  console.log('📝 Message:', JSON.stringify(testMessage, null, 2));
  
  try {
    const response = await axios.post(WEBHOOK_URL, testMessage);
    console.log('✅ Success! Response:', response.data);
  } catch (error) {
    console.error('❌ Error:', error.response?.data || error.message);
  }
}

async function testSocialManagerWebhook() {
  console.log('\n🌐 Testing Social Manager webhook...');
  console.log('📡 URL:', SOCIAL_MANAGER_WEBHOOK);
  console.log('📝 Message:', JSON.stringify(testMessage, null, 2));
  
  try {
    const response = await axios.post(SOCIAL_MANAGER_WEBHOOK, testMessage, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer your-api-key-here'
      }
    });
    console.log('✅ Success! Response:', response.data);
  } catch (error) {
    console.error('❌ Error:', error.response?.data || error.message);
  }
}

async function runTests() {
  console.log('🚀 Starting webhook tests...\n');
  
  await testLocalWebhook();
  await testSocialManagerWebhook();
  
  console.log('\n✨ Tests completed!');
  console.log('\n💡 Tips:');
  console.log('- Make sure your server is running on port 5000');
  console.log('- Check the messenger app to see if messages appear');
  console.log('- Update the API key in the script if needed');
}

// Run tests if this file is executed directly
if (require.main === module) {
  runTests();
}

module.exports = { testLocalWebhook, testSocialManagerWebhook };
