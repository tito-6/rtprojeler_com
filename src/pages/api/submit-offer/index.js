// src/pages/api/submit-offer/index.js
import pool from "@/lib/dbConnect";
import nodemailer from "nodemailer";
import fetch from "node-fetch";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    // Extract data from req.body
    const {
      name,
      email,
      phone,
      marketingMessages,
      fingerprint,
      clientMessage,
    } = req.body;

    // Adjust the INSERT statement to remove clientMessage
    const query = `
      INSERT INTO leads (name, email, phone, fingerprint)
      VALUES (?, ?, ?, ?)
    `;
    const values = [
      name || null,
      email || null,
      phone || null,
      fingerprint || null,
    ];

    const [result] = await pool.execute(query, values);
    console.log("Lead saved to MySQL successfully, ID:", result.insertId);

    // Send lead to Strapi CMS
    const strapiPayload = {
      data: {
        name,
        email,
        phone,
        acceptMarketing: marketingMessages,
        fingerprint,
      },
    };

    console.log("Sending data to Strapi:", strapiPayload);

    const strapiResponse = await fetch(`${process.env.STRAPI_API_URL}/api/leads`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.STRAPI_API_TOKEN}`,
      },
      body: JSON.stringify(strapiPayload),
    });

    const strapiResult = await strapiResponse.json();

    if (!strapiResponse.ok) {
      console.error("Failed to send lead to Strapi:", strapiResult);
    } else {
      console.log("Lead created in Strapi successfully");
    }

    // Send email notification using nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.RECEIVER_EMAIL,
      subject: `New Offer Request from ${name}`,
      text: `Name: ${name}
Email: ${email}
Phone: ${phone}
Marketing Messages: ${marketingMessages ? "Yes" : "No"}
Client Message: ${clientMessage || "No message provided"}
Fingerprint: ${fingerprint}`,
    });

    return res.status(200).json({ message: "Offer submitted successfully." });
  } catch (error) {
    console.error("Error in submit-offer API:", error);
    return res.status(500).json({
      message: `Failed to process offer request: ${error.message}`,
    });
  }
}
