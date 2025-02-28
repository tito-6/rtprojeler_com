// /src/pages/api/submit-offer/index.js
import nodemailer from "nodemailer";

export const config = {
  api: {
    bodyParser: true,
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
  
  try {
    const {
      name,
      email,
      phone,
      marketingMessages,
      offerDetails,
      clientMessage,
      appointmentDate, // If applicable
      recaptchaToken,
      authMethod,
    } = req.body;
    
    // Validate required fields
    if (!name || !email || !phone || !clientMessage) {
      return res.status(400).json({
        message: "Name, email, phone, and client message are required fields.",
      });
    }
    
    // Optionally verify reCAPTCHA if a token is provided
    if (recaptchaToken) {
      const secretKey = process.env.RECAPTCHA_SECRET_KEY;
      const recaptchaUrl = `https://www.google.com/recaptcha/api/siteverify`;
      const params = new URLSearchParams();
      params.append("secret", secretKey);
      params.append("response", recaptchaToken);
      
      const verifyCaptchaResponse = await fetch(recaptchaUrl, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params.toString(),
      });
      
      const recaptchaResult = await verifyCaptchaResponse.json();
      if (!recaptchaResult.success) {
        console.warn("reCAPTCHA validation failed:", recaptchaResult);
        // Proceed without blocking submission, but log the failed verification
      }
    }
    
    // Set up Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // Your Gmail address
        pass: process.env.EMAIL_PASS, // Your Gmail password or App Password
      },
    });
    
    // Email options to send to multiple recipients
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: `${process.env.RECEIVER_EMAIL}, reportage.turkiye.elgi@gmail.com`,
      subject: `New Offer Request from ${name}`,
      text: `
You have received a new offer request from ${name}.

Email: ${email}
Phone: ${phone}
Offer Details: ${offerDetails || "Not specified"}
Marketing Messages: ${marketingMessages ? "Yes" : "No"}
Client Message: ${clientMessage}
Appointment Date: ${appointmentDate ? appointmentDate : "No appointment requested"}
Authentication Method: ${authMethod || "N/A"}
Recaptcha Token: ${recaptchaToken || "N/A"}
      `,
    };
    
    // Send the email using Nodemailer
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.messageId);
    
    // Capture the client's IP and User Agent from the request
    const clientIp = req.headers["x-forwarded-for"] || req.socket.remoteAddress || "";
    const clientUserAgent = req.headers["user-agent"] || "";
    
    // Build the conversion payload for the offer event.
    // This payload will be sent to your Conversions API endpoint.
    const conversionPayload = {
      eventName: "Offer",
      eventTime: Math.floor(Date.now() / 1000),
      userData: {
        email,
        phone,
        // Pass the client IP and user agent explicitly since this server-to-server call
        client_ip_address: clientIp,
        client_user_agent: clientUserAgent,
      },
      customData: {
        offerDetails,
        marketingMessages,
        clientMessage,
        authMethod,
      },
      // Use the referer header if available; otherwise, an empty string.
      eventSourceUrl: req.headers.referer || "",
      testEventCode: "TEST_OFFER"
    };
    
    // Call the Conversions API endpoint.
    // Ensure that NEXT_PUBLIC_HOST is set (e.g. "http://localhost:3000" for development)
    const host = process.env.NEXT_PUBLIC_HOST || "http://localhost:3000";
    const conversionsUrl = `${host}/api/conversions`;
    const convResponse = await fetch(conversionsUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(conversionPayload),
    });
    const convResult = await convResponse.json();
    console.log("Offer Conversions API response:", convResult);
    
    return res.status(200).json({ message: "Offer submitted successfully!" });
    
  } catch (error) {
    console.error("Error in submit-offer API:", error);
    return res.status(500).json({
      message: "Failed to process offer request",
      error: error.message,
    });
  }
}
