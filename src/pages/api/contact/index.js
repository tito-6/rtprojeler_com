import nodemailer from "nodemailer";
import pool from "@/lib/dbConnect";
import fetch from "node-fetch";

// Validate environment variables
const requiredEnvVars = [
  'NEXT_PUBLIC_RECAPTCHA_SECRET_KEY',
  'EMAIL_USER',
  'EMAIL_PASS',
  'RECEIVER_EMAIL',
  'STRAPI_API_URL',
  'STRAPI_API_TOKEN'
];

requiredEnvVars.forEach((varName) => {
  if (!process.env[varName]) {
    throw new Error(`Missing environment variable: ${varName}`);
  }
});

let submissions = {}; // In-memory submission store for demonstration

// Default export handler function
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
      project,
      unitType,
      message,
      appointmentDate,
      acceptMarketing,
      languages,
      recaptchaToken,
      fingerprint,
    } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({ message: "Name, email, and phone are required." });
    }

    const today = new Date().toISOString().split("T")[0];

    if (submissions[fingerprint]?.date === today) {
      return res.status(400).json({ message: "You have already submitted the form today." });
    }

    // Validate recaptchaToken if present
    if (recaptchaToken) {
      const secretKey = process.env.NEXT_PUBLIC_RECAPTCHA_SECRET_KEY;
      const recaptchaUrl = "https://www.google.com/recaptcha/api/siteverify";
      const verifyCaptchaResponse = await fetch(recaptchaUrl, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `secret=${secretKey}&response=${recaptchaToken}`,
      });

      const recaptchaResult = await verifyCaptchaResponse.json();
      if (!recaptchaResult.success) {
        return res.status(400).json({ message: "Failed reCAPTCHA validation" });
      }
    }

    submissions[fingerprint] = { date: today };

    // Save lead in MySQL
    const query = `
      INSERT INTO contact_requests (name, email, phone, project, unitType, message, appointmentDate, languages, acceptMarketing, fingerprint)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
      name,
      email,
      phone,
      project || null,
      unitType || null,
      message || null,
      appointmentDate && appointmentDate !== "Randevu planlanmadı" ? appointmentDate : null,
      JSON.stringify(languages),
      acceptMarketing ? 1 : 0,
      fingerprint || null,
    ];
    
    const [result] = await pool.execute(query, values);
    console.log("Contact request saved to MySQL successfully, ID:", result.insertId);

    // Send lead to Strapi CMS
    const strapiPayload = {
      data: {
        name,
        email,
        phone,
        acceptMarketing: !!acceptMarketing, // Ensure it's a boolean
        fingerprint,
      },
    };

    console.log("Sending data to Strapi:", strapiPayload);

    const strapiResponse = await fetch(`${process.env.STRAPI_API_URL}/api/leads`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.STRAPI_API_TOKEN}`
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

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.RECEIVER_EMAIL,
      subject: `New Inquiry from ${name}`,
      text: `
        You have received a new message from ${name}.
        Phone: ${phone}
        Project Interested In: ${project}
        Preferred Unit Type: ${unitType}
        Message: ${message}
        Appointment: ${appointmentDate || "No appointment requested"}
        Marketing Consent: ${acceptMarketing ? "Yes" : "No"}
        Languages Selected: ${languages.join(", ")}
      `,
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({ message: "Email sent and data saved successfully!" });
  } catch (error) {
    console.error("Error in contact API:", error);
    return res.status(500).json({
      message: "Failed to process contact request",
      error: error.message,
    });
  }
}
