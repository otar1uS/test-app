const axios = require('axios');

const WEBHOOK_URL = 'https://test-app-qbfz.onrender.com/webhook/receive';

async function testCompleteFlow() {
  try {
    console.log('🔄 Testing complete conversation flow...\n');
    
    // Step 1: Send a message from your app to Social Manager
    console.log('📤 Step 1: Sending message to Social Manager...');
    const outgoingMessage = {
      sender_id: 'custom_messenger_user',
      message: 'Hello! This is a test message from the custom messenger app.',
      timestamp: new Date().toISOString()
    };
    
    console.log('Outgoing message:', outgoingMessage);
    console.log('✅ This should appear in your Social Manager dashboard\n');
    
    // Step 2: Simulate Social Manager sending a response back
    console.log('📥 Step 2: Simulating Social Manager response...');
    const incomingMessage = {
      sender_id: 'AI Assistant',
      message: 'Hello! I received your message. This is a test response from Social Manager.',
      timestamp: new Date().toISOString()
    };
    
    console.log('Incoming message:', incomingMessage);
    
    const response = await axios.post(WEBHOOK_URL, incomingMessage, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    console.log('✅ Response received:', response.data);
    console.log('✅ This message should now appear in your messenger app!\n');
    
    // Step 3: Check if the message was stored
    console.log('📋 Step 3: Checking stored messages...');
    const messagesResponse = await axios.get('https://test-app-qbfz.onrender.com/api/messages');
    console.log('Total messages stored:', messagesResponse.data.length);
    console.log('Latest messages:', messagesResponse.data.slice(-3));
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    }
  }
}

testCompleteFlow();
