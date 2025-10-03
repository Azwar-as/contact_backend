const nodemailer = require("nodemailer");

export default async function handler(req, res) {
  // Tambahkan Header CORS
  res.setHeader("Access-Control-Allow-Origin", "https://azwar-as.github.io"); // domain kamu
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Kalau OPTIONS (preflight), langsung balikin 200
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { name, email, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `Message from ${name}`,
      text: `From: ${email}\n\n${message}`,
      replyTo: email,
    });

    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Failed to send email" });
  }
}
