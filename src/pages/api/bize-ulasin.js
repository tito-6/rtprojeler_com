import nodemailer from "nodemailer";

let submissions = {}; // In-memory submission store

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

    if (!name || !email || !phone) {
      return res.status(400).json({ message: "Name, email, and phone are required." });
    }

    const today = new Date().toISOString().split("T")[0];
    if (submissions[fingerprint]?.date === today) {
      return res.status(400).json({ message: "You have already submitted the form today." });
    }

    submissions[fingerprint] = { date: today };

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
Project Interested In: ${project || "N/A"}
Preferred Unit Type: ${unitType || "N/A"}
Message: ${message || "No message provided"}
Appointment: ${appointmentDate || "No appointment requested"}
Marketing Consent: ${acceptMarketing ? "Yes" : "No"}
Languages Selected: ${languages ? languages.join(", ") : "N/A"}
Fingerprint: ${fingerprint || "N/A"}
      `,
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({ message: "Email sent successfully!" });
  } catch (error) {
    console.error("Error in API:", error);
    return res.status(500).json({ message: "Failed to process contact request" });
  }
}
