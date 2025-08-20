# Custom Messenger App

A real-time messaging application designed to integrate with Social Manager platform. This app provides a webhook endpoint for receiving messages and can send messages to your Social Manager webhook.

## Features

- 🚀 Real-time messaging with Socket.IO
- 📡 Webhook endpoint for receiving messages
- 🔄 Bidirectional communication with Social Manager
- 💬 Beautiful, responsive chat interface
- 🧪 Built-in testing tools
- 📱 Mobile-friendly design

## Quick Start

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone and install dependencies:**
   ```bash
   npm install
   cd client && npm install
   cd ..
   ```

2. **Set up environment variables:**
   ```bash
   cp env.example .env
   ```
   
   Edit `.env` file:
   ```env
   PORT=5000
   SOCIAL_MANAGER_WEBHOOK=https://socialmanager.ge/webhook/other/
   API_KEY=your-api-key-here
   NODE_ENV=development
   ```

3. **Start the application:**
   ```bash
   npm run dev
   ```

   This will start both the backend server (port 5000) and frontend (port 3000).

## Usage

### Accessing the App

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000
- **Webhook Endpoint:** http://localhost:5000/webhook/receive

### Sending Messages

1. Open the app in your browser
2. Set your desired Sender ID
3. Type your message and click "Send"
4. Messages are automatically sent to your Social Manager webhook

### Receiving Messages

The app automatically receives messages via the webhook endpoint:
- **URL:** `http://localhost:5000/webhook/receive`
- **Method:** POST
- **Format:**
  ```json
  {
    "sender_id": "user123",
    "message": "Hello from Social Manager",
    "timestamp": "2025-01-20T10:00:00Z"
  }
  ```

### Testing

Use the built-in test buttons:
- **Test Webhook:** Sends a test message to your own webhook
- **Refresh Messages:** Reloads all messages from the server

## API Endpoints

### Backend Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/webhook/receive` | POST | Receive messages from Social Manager (legacy + new format) |
| `/api/receive-response` | POST | Receive AI responses from Social Manager (recommended) |
| `/api/send-message` | POST | Send messages to Social Manager |
| `/api/messages` | GET | Get all messages |
| `/health` | GET | Health check |
| `/webhook/test` | GET | Webhook test info |

### Message Format

**Outgoing (to Social Manager):**
```json
{
  "sender_id": "custom_messenger_user",
  "message": "Hello from Custom Messenger",
  "timestamp": "2025-01-20T10:00:00Z"
}
```

**Incoming (from Social Manager):**
```json
{
  "sender_id": "user123",
  "message": "Hello from Social Manager",
  "timestamp": "2025-01-20T10:00:00Z"
}
```

**AI Response (from Social Manager):**
```json
{
  "recipient_id": "custom_messenger_user",
  "message": "AI response message",
  "platform": "other",
  "timestamp": "2025-01-20T10:00:00Z"
}
```

## Social Manager Integration

### Platform Configuration

Use these settings in your Social Manager platform:

- **Platform Type:** Custom Messenger
- **Platform ID:** `custom_messenger_001`
- **Display Name:** My Custom Messenger App
- **Webhook URL:** `https://socialmanager.ge/webhook/other/` (where you send messages)
- **Response URL:** `https://your-domain.com/api/receive-response` (where you receive AI responses)
- **Webhook Secret/API Key:** (optional) Your API key for authentication

**Important:** Make sure to set the **Response URL** to your Custom Messenger's `/api/receive-response` endpoint so that AI responses are sent back to your app.

### Authentication

If you're using API key authentication, include it in the Authorization header:
```
Authorization: Bearer your-api-key-here
```

## Development

### Project Structure

```
custom-messenger/
├── server.js              # Express server
├── package.json           # Backend dependencies
├── client/                # React frontend
│   ├── src/
│   │   ├── App.js         # Main React component
│   │   ├── App.css        # Styles
│   │   └── index.js       # React entry point
│   └── package.json       # Frontend dependencies
├── env.example            # Environment variables template
└── README.md              # This file
```

### Available Scripts

- `npm start` - Start production server
- `npm run dev` - Start development mode (both frontend and backend)
- `npm run server` - Start backend only
- `npm run client` - Start frontend only
- `npm run build` - Build frontend for production

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | 5000 |
| `SOCIAL_MANAGER_WEBHOOK` | Social Manager webhook URL | https://socialmanager.ge/webhook/other/ |
| `API_KEY` | Authentication key | your-api-key-here |
| `NODE_ENV` | Environment | development |

## Deployment

### Local Development
```bash
npm run dev
```

### Production
```bash
npm run build
npm start
```

### Docker (Optional)
```bash
docker build -t custom-messenger .
docker run -p 5000:5000 custom-messenger
```

## Troubleshooting

### Common Issues

1. **Port already in use:**
   - Change the PORT in `.env` file
   - Kill processes using the port: `lsof -ti:5000 | xargs kill -9`

2. **CORS errors:**
   - Ensure the frontend is running on port 3000
   - Check that the proxy is set correctly in `client/package.json`

3. **Webhook not receiving messages:**
   - Verify the webhook URL is correct
   - Check that your Social Manager is sending the correct JSON format
   - Ensure the server is running and accessible

4. **Messages not sending to Social Manager:**
   - Verify the Social Manager webhook URL is correct
   - Check your API key if authentication is required
   - Ensure the Social Manager webhook is accepting POST requests

### Debug Mode

Enable debug logging by setting `NODE_ENV=development` in your `.env` file.

## Support

For issues or questions:
1. Check the console logs for error messages
2. Verify all environment variables are set correctly
3. Test the webhook endpoint manually using curl or Postman

## License

MIT License - feel free to use this project for your Social Manager integration needs!
