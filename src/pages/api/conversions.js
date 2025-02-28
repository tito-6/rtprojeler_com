// src/pages/api/conversions.js
import crypto from 'crypto';

// Helper function to hash sensitive data (e.g., email, phone)
const hashData = (data) => {
  if (!data) return '';
  return crypto.createHash('sha256').update(data.trim().toLowerCase()).digest('hex');
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST requests are allowed' });
  }

  try {
    // Extract event information from the request body
    const {
      eventName,
      eventTime,
      userData,
      customData,
      eventSourceUrl,
      testEventCode // Passed from the client for testing
    } = req.body;

    // Process user data: hash email and phone but pass other parameters as plain text.
    const processedUserData = {};
    if (userData) {
      if (userData.email) {
        processedUserData.em = [hashData(userData.email)];
      }
      if (userData.phone) {
        processedUserData.ph = [hashData(userData.phone)];
      }
      // fbc and fbp should be sent un-hashed
      if (userData.fbc) {
        processedUserData.fbc = userData.fbc;
      }
      if (userData.fbp) {
        processedUserData.fbp = userData.fbp;
      }
      // If an external_id is provided, hash it as recommended
      if (userData.external_id) {
        processedUserData.external_id = [hashData(userData.external_id)];
      }
    }

    // Retrieve client IP and User Agent from request headers.
    // Per Facebook’s documentation, these must be within user_data.
    const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '';
    const clientUserAgent = req.headers['user-agent'] || '';

    processedUserData.client_ip_address = clientIp;
    processedUserData.client_user_agent = clientUserAgent;

    // Optionally, attempt to retrieve fbc and fbp from cookies if not provided in the payload.
    if (req.headers.cookie) {
      const cookies = req.headers.cookie.split(';').reduce((acc, cookieStr) => {
        const [key, value] = cookieStr.split('=');
        if (key && value) {
          acc[key.trim()] = value.trim();
        }
        return acc;
      }, {});
      if (!processedUserData.fbc && (cookies.fbc || cookies._fbc)) {
        processedUserData.fbc = cookies.fbc || cookies._fbc;
      }
      if (!processedUserData.fbp && (cookies.fbp || cookies._fbp)) {
        processedUserData.fbp = cookies.fbp || cookies._fbp;
      }
    }

    // Build the payload as per Facebook's Conversions API specifications.
    // Note: test_event_code is set at the top level.
    const payload = {
      data: [
        {
          event_name: eventName,
          event_time: eventTime || Math.floor(Date.now() / 1000),
          action_source: 'website', // For web events
          event_source_url: eventSourceUrl,
          user_data: processedUserData,
          custom_data: customData
        }
      ],
      test_event_code: testEventCode
    };

    // Construct the endpoint URL using your environment variables.
    const apiVersion = process.env.API_VERSION || 'v16.0';
    const pixelId = process.env.PIXEL_ID;
    const accessToken = process.env.FB_ACCESS_TOKEN;
    const url = `https://graph.facebook.com/${apiVersion}/${pixelId}/events?access_token=${accessToken}`;

    // Send the POST request to Facebook.
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: { 'Content-Type': 'application/json' }
    });
    const dataResponse = await response.json();
    console.log('Facebook Conversions API response:', dataResponse);

    if (!response.ok) {
      return res.status(response.status).json(dataResponse);
    }
    return res.status(200).json(dataResponse);
  } catch (error) {
    console.error('Error sending event to Facebook:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
} 


