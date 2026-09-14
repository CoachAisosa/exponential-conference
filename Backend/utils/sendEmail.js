const nodemailer = require("nodemailer");

const sendEmail = async ({ to, subject, text, html }) => {
  console.log("📨 sendEmail called with:");
  console.log("   to:", to);
  console.log("   subject:", subject);
  console.log("   text length:", text?.length);

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: `"Exponential Conference" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    text,
    html,
  };

  const info = await transporter.sendMail(mailOptions);

  console.log("✅ Email sent:", info.messageId);

  return info;
};

module.exports = sendEmail;