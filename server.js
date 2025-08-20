const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const http = require('http');
const socketIo = require('socket.io');
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: process.env.NODE_ENV === 'production' 
      ? ["https://custom-messenger.onrender.com", "https://*.onrender.com"]
      : "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true
  }
});

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Serve static files from React build in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
}

// Configuration
const PORT = process.env.PORT || 5000;
const SOCIAL_MANAGER_WEBHOOK = process.env.SOCIAL_MANAGER_WEBHOOK || 'https://socialmanager.ge/webhook/other/';
const API_KEY = process.env.API_KEY || 'your-api-key-here';

// Store messages in memory (in production, use a database)
let messages = [];
let connectedUsers = new Set();

// Webhook endpoint to receive messages from Social Manager
app.post('/webhook/receive', (req, res) => {
  try {
    const { sender_id, message, timestamp } = req.body;
    
    if (!sender_id || !message) {
      return res.status(400).json({ error: 'Missing required fields: sender_id and message' });
    }

    const newMessage = {
      id: uuidv4(),
      sender_id,
      message,
      timestamp: timestamp || new Date().toISOString(),
      direction: 'incoming'
    };

    messages.push(newMessage);
    
    // Broadcast to all connected clients
    io.emit('newMessage', newMessage);
    
    console.log('Received message from Social Manager:', newMessage);
    res.status(200).json({ success: true, message: 'Message received' });
    
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Endpoint to send messages to Social Manager
app.post('/api/send-message', async (req, res) => {
  try {
    const { message, sender_id = 'custom_messenger_user' } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const messageData = {
      sender_id,
      message,
      timestamp: new Date().toISOString()
    };

    // Store message locally first
    const newMessage = {
      id: uuidv4(),
      ...messageData,
      direction: 'outgoing'
    };

    messages.push(newMessage);
    io.emit('newMessage', newMessage);

    // Try to send to Social Manager webhook (optional)
    try {
      const response = await axios.post(SOCIAL_MANAGER_WEBHOOK, messageData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`
        }
      });
      console.log('Message sent to Social Manager:', newMessage);
    } catch (webhookError) {
      console.log('Note: Social Manager webhook not responding, but message stored locally');
      // Don't fail the request if Social Manager is not available
    }

    res.status(200).json({ success: true, message: 'Message sent successfully' });
    
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ error: 'Failed to send message' });
  }
});

// Get all messages
app.get('/api/messages', (req, res) => {
  res.json(messages);
});

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);
  connectedUsers.add(socket.id);
  
  // Send existing messages to new user
  socket.emit('messages', messages);
  
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
    connectedUsers.delete(socket.id);
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    connectedUsers: connectedUsers.size,
    messageCount: messages.length
  });
});

// Webhook test endpoint
app.get('/webhook/test', (req, res) => {
  res.json({
    status: 'Webhook endpoint is working',
    endpoint: '/webhook/receive',
    method: 'POST',
    expectedFormat: {
      sender_id: 'string',
      message: 'string',
      timestamp: 'string (optional)'
    }
  });
});

// Serve React app for all other routes in production
if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

server.listen(PORT, () => {
  console.log(`🚀 Custom Messenger Server running on port ${PORT}`);
  console.log(`📡 Webhook endpoint: http://localhost:${PORT}/webhook/receive`);
  console.log(`🔗 Social Manager webhook: ${SOCIAL_MANAGER_WEBHOOK}`);
  console.log(`🏥 Health check: http://localhost:${PORT}/health`);
});
