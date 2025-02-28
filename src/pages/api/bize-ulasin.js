// /pages/api/contact-us/index.js

import nodemailer from "nodemailer";

let submissions = {}; // In-memory submission store

export const config = {
  api: {
    bodyParser: true,
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ message: "Method not allowed" });
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
      fingerprint,
    } = req.body;

    // Validate required fields
    if (!name || !email || !phone) {
      return res.status(400).json({ message: "Name, email, and phone are required." });
    }

    // Prevent multiple submissions from the same fingerprint per day
    const today = new Date().toISOString().split("T")[0];
    if (submissions[fingerprint]?.date === today) {
      return res.status(400).json({ message: "You have already submitted the form today." });
    }

    submissions[fingerprint] = { date: today };

    // Set up Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // Your Gmail address
        pass: process.env.EMAIL_PASS, // Your Gmail password or App Password
      },
    });

    // Format languages array into a string
    const formattedLanguages = languages && Array.isArray(languages)
      ? languages.join(", ")
      : "N/A";

    // Format offer details into a readable string if needed
    // (Assuming 'project' and 'unitType' are part of offer details)
    // If you have more complex offer details, consider formatting them accordingly

    // Email options to send to both recipients
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: "ahmadalkhalid533@gmail.com, reportage.turkiye.elgi@gmail.com", // Updated to include both emails
      subject: `New Inquiry from ${name}`,
      text: `
You have received a new message from ${name}.

Email: ${email}
Phone: ${phone}
Project Interested In: ${project || "N/A"}
Preferred Unit Type: ${unitType || "N/A"}
Message: ${message || "No message provided"}
Appointment: ${appointmentDate || "No appointment requested"}
Marketing Consent: ${acceptMarketing ? "Yes" : "No"}
Languages Selected: ${formattedLanguages}
Fingerprint: ${fingerprint || "N/A"}
      `,
    };

    // Send the email using Nodemailer
    await transporter.sendMail(mailOptions);

    return res.status(200).json({ message: "Email sent successfully!" });
  } catch (error) {
    console.error("Error in Contact Us API:", error);
    return res.status(500).json({ message: "Failed to process contact request" });
  }
}
