const axios = require('axios');

// Test your production webhook
const WEBHOOK_URL = 'https://test-app-qbfz.onrender.com/webhook/receive';

async function testWebhook() {
  try {
    console.log('🧪 Testing webhook endpoint...');
    console.log('URL:', WEBHOOK_URL);
    
    const testMessage = {
      sender_id: 'social_manager_test',
      message: 'This is a test message from Social Manager',
      timestamp: new Date().toISOString()
    };
    
    console.log('📤 Sending test message:', testMessage);
    
    const response = await axios.post(WEBHOOK_URL, testMessage, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    console.log('✅ Webhook test successful!');
    console.log('Response:', response.data);
    
  } catch (error) {
    console.error('❌ Webhook test failed:');
    console.error('Error:', error.message);
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    }
  }
}

testWebhook();
