const nodemailer = require("nodemailer");

export default async function handler(req, res) {
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
