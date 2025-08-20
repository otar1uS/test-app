# Social Manager Platform Configuration Guide

## Problem
The AI responses from Social Manager are not appearing in your Custom Messenger app because the `response_url` in the Social Manager platform connection is not configured correctly.

## Solution

### Step 1: Update Social Manager Platform Connection

1. **Log into your Social Manager dashboard**
2. **Go to Platform Connections**: Navigate to `/platforms/` or `/pages/`
3. **Find your Custom Messenger connection** and click "Configure"
4. **Update the Response URL** field with one of these options:

#### Option A: Use the dedicated response endpoint (Recommended)
```
https://your-custom-messenger-domain.com/api/receive-response
```

#### Option B: Use the webhook endpoint (Legacy support)
```
https://your-custom-messenger-domain.com/webhook/receive
```

### Step 2: Verify Configuration

Your platform connection should have these settings:

- **Platform Type**: Custom Messenger (other)
- **Platform ID**: `custom_messenger_001` (or your chosen ID)
- **Display Name**: Custom Messenger App
- **Webhook URL**: `https://socialmanager.ge/webhook/other/` (where you send messages)
- **Response URL**: `https://your-custom-messenger-domain.com/api/receive-response` (where you receive AI responses)
- **API Key**: Your authentication key (if using)

### Step 3: Test the Integration

1. **Send a message** from your Custom Messenger app
2. **Check Social Manager** - you should see the message in the inbox
3. **Wait for AI response** - the AI should process and respond
4. **Check Custom Messenger** - you should now see the AI response

## Troubleshooting

### If AI responses still don't appear:

1. **Check the Response URL** in Social Manager:
   - Make sure it points to your Custom Messenger domain
   - Ensure the endpoint path is correct (`/api/receive-response`)

2. **Check Custom Messenger logs**:
   - Look for incoming webhook requests
   - Check for any error messages

3. **Test the endpoint manually**:
   ```bash
   curl -X POST https://your-custom-messenger-domain.com/api/receive-response \
     -H "Content-Type: application/json" \
     -d '{
       "recipient_id": "test_user",
       "message": "Test AI response",
       "platform": "other",
       "timestamp": "2025-01-20T10:00:00Z"
     }'
   ```

4. **Verify Social Manager logs**:
   - Check if the AI is processing messages
   - Look for any errors when sending responses

### Common Issues:

1. **Wrong domain**: Make sure you're using the correct domain for your deployed Custom Messenger app
2. **HTTPS required**: Some platforms require HTTPS for webhook URLs
3. **Authentication**: If using API keys, make sure they match between both systems
4. **CORS issues**: Ensure your Custom Messenger allows requests from Social Manager

## Expected Message Flow

1. **User sends message** in Custom Messenger
2. **Custom Messenger** sends to Social Manager: `POST https://socialmanager.ge/webhook/other/`
3. **Social Manager** processes with AI
4. **Social Manager** sends AI response to Custom Messenger: `POST https://your-domain.com/api/receive-response`
5. **Custom Messenger** displays the AI response to the user

## API Endpoints Summary

### Custom Messenger Endpoints:
- `POST /api/send-message` - Send messages to Social Manager
- `POST /webhook/receive` - Receive messages (legacy + new format)
- `POST /api/receive-response` - Receive AI responses (recommended)
- `GET /api/messages` - Get all messages
- `GET /health` - Health check

### Social Manager Endpoints:
- `POST /webhook/other/` - Receive messages from Custom Messenger
- Uses configured `response_url` to send AI responses back
