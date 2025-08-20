const axios = require('axios');

const WEBHOOK_URL = 'https://test-app-qbfz.onrender.com/webhook/receive';

async function testWithResponseURL() {
  try {
    console.log('🔄 Testing with Response URL configured...\n');
    
    // Step 1: Send a message from your app to Social Manager
    console.log('📤 Step 1: Sending message to Social Manager...');
    console.log('This should trigger Social Manager to send a response back to your Response URL');
    
    const outgoingMessage = {
      sender_id: 'custom_messenger_user',
      message: 'Hello! Can you help me with something?',
      timestamp: new Date().toISOString()
    };
    
    console.log('Outgoing message:', outgoingMessage);
    console.log('✅ This should appear in your Social Manager dashboard');
    console.log('✅ Social Manager should now send a response to your Response URL\n');
    
    // Step 2: Wait a moment for Social Manager to process
    console.log('⏳ Step 2: Waiting for Social Manager to process and respond...');
    console.log('Check your Social Manager dashboard to see if the message was received');
    console.log('The AI should generate a response and send it to your Response URL\n');
    
    // Step 3: Check if any responses were received
    console.log('📋 Step 3: Checking for received responses...');
    const messagesResponse = await axios.get('https://test-app-qbfz.onrender.com/api/messages');
    console.log('Total messages stored:', messagesResponse.data.length);
    
    const recentMessages = messagesResponse.data.slice(-5);
    console.log('Recent messages:');
    recentMessages.forEach((msg, index) => {
      console.log(`${index + 1}. [${msg.direction}] ${msg.sender_id}: ${msg.message}`);
    });
    
    console.log('\n🎯 Next Steps:');
    console.log('1. Go to your Social Manager dashboard');
    console.log('2. Check if your message was received');
    console.log('3. Look for any AI responses being sent');
    console.log('4. Check your messenger app for new messages');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    }
  }
}

testWithResponseURL();
