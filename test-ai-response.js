#!/usr/bin/env node

/**
 * Test script to verify AI response endpoint
 * Run this to test if your Custom Messenger can receive AI responses
 */

const axios = require('axios');

// Configuration - Update these URLs to match your setup
const CUSTOM_MESSENGER_URL = process.env.CUSTOM_MESSENGER_URL || 'https://test-app-qbfz.onrender.com';
const RESPONSE_ENDPOINT = `${CUSTOM_MESSENGER_URL}/api/receive-response`;

async function testAIResponse() {
  console.log('🧪 Testing AI Response Endpoint');
  console.log('=' * 50);
  console.log(`📡 Testing endpoint: ${RESPONSE_ENDPOINT}`);
  
  const testResponse = {
    recipient_id: 'custom_messenger_user',
    message: 'This is a test AI response from Social Manager!',
    platform: 'other',
    timestamp: new Date().toISOString()
  };
  
  console.log('📝 Sending test payload:');
  console.log(JSON.stringify(testResponse, null, 2));
  
  try {
    const response = await axios.post(RESPONSE_ENDPOINT, testResponse, {
      headers: {
        'Content-Type': 'application/json'
      },
      timeout: 10000
    });
    
    console.log('✅ SUCCESS!');
    console.log(`📥 Status: ${response.status}`);
    console.log(`📥 Response: ${JSON.stringify(response.data, null, 2)}`);
    
    if (response.status === 200) {
      console.log('\n🎉 AI response endpoint is working correctly!');
      console.log('💡 Now check your Custom Messenger app - you should see the test message.');
    }
    
  } catch (error) {
    console.log('❌ FAILED!');
    
    if (error.response) {
      console.log(`📥 Status: ${error.response.status}`);
      console.log(`📥 Response: ${error.response.data}`);
    } else if (error.request) {
      console.log('📥 No response received - check if the server is running');
    } else {
      console.log(`📥 Error: ${error.message}`);
    }
    
    console.log('\n🔧 Troubleshooting:');
    console.log('1. Make sure your Custom Messenger app is running');
    console.log('2. Check the CUSTOM_MESSENGER_URL environment variable');
    console.log('3. Verify the endpoint URL is correct');
    console.log('4. Check server logs for any errors');
  }
}

async function testWebhookEndpoint() {
  console.log('\n🧪 Testing Webhook Endpoint');
  console.log('=' * 50);
  console.log(`📡 Testing endpoint: ${CUSTOM_MESSENGER_URL}/webhook/receive`);
  
  const testMessage = {
    sender_id: 'test_user',
    message: 'This is a test message from Social Manager!',
    timestamp: new Date().toISOString()
  };
  
  try {
    const response = await axios.post(`${CUSTOM_MESSENGER_URL}/webhook/receive`, testMessage, {
      headers: {
        'Content-Type': 'application/json'
      },
      timeout: 10000
    });
    
    console.log('✅ Webhook endpoint is working!');
    console.log(`📥 Status: ${response.status}`);
    
  } catch (error) {
    console.log('❌ Webhook endpoint failed!');
    console.log(`📥 Error: ${error.message}`);
  }
}

async function main() {
  console.log('🚀 Custom Messenger AI Response Test');
  console.log('=' * 50);
  
  // Test the webhook endpoint first
  await testWebhookEndpoint();
  
  // Test the AI response endpoint
  await testAIResponse();
  
  console.log('\n📋 Next Steps:');
  console.log('1. If both tests pass, your endpoints are working');
  console.log('2. Update your Social Manager platform connection:');
  console.log(`   - Response URL: ${RESPONSE_ENDPOINT}`);
  console.log('3. Send a message from your Custom Messenger app');
  console.log('4. Check if AI responses appear in your app');
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = { testAIResponse, testWebhookEndpoint };
