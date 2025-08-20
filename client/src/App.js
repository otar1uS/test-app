import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import './App.css';

const SOCKET_SERVER = 'http://localhost:5000';

function App() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [senderId, setSenderId] = useState('custom_messenger_user');
  const [status, setStatus] = useState('Connecting...');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    // Initialize socket connection
    const newSocket = io(SOCKET_SERVER);
    setSocket(newSocket);

    newSocket.on('connect', () => {
      setIsConnected(true);
      setStatus('Connected to server');
    });

    newSocket.on('disconnect', () => {
      setIsConnected(false);
      setStatus('Disconnected from server');
    });

    newSocket.on('messages', (existingMessages) => {
      setMessages(existingMessages);
    });

    newSocket.on('newMessage', (message) => {
      setMessages(prev => [...prev, message]);
    });

    // Load existing messages
    loadMessages();

    return () => newSocket.close();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const loadMessages = async () => {
    try {
      const response = await axios.get('/api/messages');
      setMessages(response.data);
    } catch (error) {
      console.error('Error loading messages:', error);
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !isConnected) return;

    try {
      await axios.post('/api/send-message', {
        message: newMessage,
        sender_id: senderId
      });
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message. Please try again.');
    }
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString();
  };

  const testWebhook = async () => {
    try {
      const response = await axios.post('/webhook/receive', {
        sender_id: 'test_user',
        message: 'This is a test message from the messenger app',
        timestamp: new Date().toISOString()
      });
      alert('Test message sent successfully!');
    } catch (error) {
      console.error('Webhook test failed:', error);
      alert('Webhook test failed. Check console for details.');
    }
  };

  return (
    <div className="App">
      <div className="messenger-container">
        {/* Header */}
        <div className="header">
          <div className="header-content">
            <h1>💬 Custom Messenger</h1>
            <div className="status-indicator">
              <span className={`status-dot ${isConnected ? 'connected' : 'disconnected'}`}></span>
              <span className="status-text">{status}</span>
            </div>
          </div>
          <div className="sender-id-section">
            <label htmlFor="senderId">Sender ID:</label>
            <input
              id="senderId"
              type="text"
              value={senderId}
              onChange={(e) => setSenderId(e.target.value)}
              placeholder="Enter sender ID"
            />
          </div>
        </div>

        {/* Messages Area */}
        <div className="messages-container">
          <div className="messages-list">
            {messages.length === 0 ? (
              <div className="no-messages">
                <p>No messages yet. Start a conversation!</p>
              </div>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={`message ${message.direction === 'outgoing' ? 'outgoing' : 'incoming'}`}
                >
                  <div className="message-content">
                    <div className="message-header">
                      <span className="sender">{message.sender_id}</span>
                      <span className="time">{formatTime(message.timestamp)}</span>
                    </div>
                    <div className="message-text">{message.message}</div>
                    <div className="message-direction">
                      {message.direction === 'outgoing' ? '📤 Sent' : '📥 Received'}
                    </div>
                  </div>
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <div className="input-container">
          <form onSubmit={sendMessage} className="message-form">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              disabled={!isConnected}
              className="message-input"
            />
            <button
              type="submit"
              disabled={!newMessage.trim() || !isConnected}
              className="send-button"
            >
              Send
            </button>
          </form>
        </div>

        {/* Test Controls */}
        <div className="test-controls">
          <button onClick={testWebhook} className="test-button">
            Test Webhook
          </button>
          <button onClick={loadMessages} className="test-button">
            Refresh Messages
          </button>
        </div>

        {/* Connection Info */}
        <div className="connection-info">
          <h3>Connection Information</h3>
          <div className="info-grid">
            <div className="info-item">
              <strong>Webhook URL:</strong>
              <span>http://localhost:5000/webhook/receive</span>
            </div>
            <div className="info-item">
              <strong>Social Manager:</strong>
              <span>https://socialmanager.ge/webhook/other/ (outgoing)</span>
            </div>
            <div className="info-item">
              <strong>Connected Users:</strong>
              <span>{isConnected ? '1' : '0'}</span>
            </div>
            <div className="info-item">
              <strong>Total Messages:</strong>
              <span>{messages.length}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
