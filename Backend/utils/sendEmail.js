const nodemailer = require("nodemailer");
const dns = require("dns");

// ✅ Force IPv4 DNS resolution
dns.setDefaultResultOrder("ipv4first");

const sendEmail = async ({ to, subject, text, html }) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,           // Try 465 first (SSL)
    secure: true,        // SSL
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
    // ✅ Custom DNS resolver forcing IPv4
    lookup: (hostname, options, callback) => {
      dns.lookup(hostname, { family: 4 }, callback);
    },
    connectionTimeout: 15000,
    greetingTimeout: 15000,
    socketTimeout: 15000,
    tls: {
      rejectUnauthorized: false,
    },
  });

  const info = await transporter.sendMail({
    from: `"Exponential Conference" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    text,
    html,
  });

  console.log("✅ Email sent to:", to);
  console.log("📧 Subject:", subject);
  return info;
};

module.exports = sendEmail;