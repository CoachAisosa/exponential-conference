// ============================================================
// SendGrid / Brevo API (HTTP-based) — WORKS ON RENDER
// ============================================================
// Why this works:
// - Uses HTTPS (port 443) instead of SMTP (port 587/465)
// - Render free tier blocks SMTP ports but allows HTTPS
// ============================================================

const brevo = require("@getbrevo/brevo");

const sendEmail = async ({ to, subject, text, html }) => {
  // Create API instance
  const apiInstance = new brevo.TransactionalEmailsApi();

  // Set API key
  apiInstance.setApiKey(
    brevo.TransactionalEmailsApiApiKeys.apiKey,
    process.env.BREVO_API_KEY
  );

  // Build the email
  const sendSmtpEmail = new brevo.SendSmtpEmail();
  sendSmtpEmail.subject = subject;
  sendSmtpEmail.htmlContent = html || `<p>${text || ""}</p>`;
  sendSmtpEmail.textContent = text || "";
  sendSmtpEmail.sender = {
    name: "Exponential Conference",
    email: process.env.EMAIL_USER, // Your verified sender email
  };
  sendSmtpEmail.to = [{ email: to }];

  // Send it
  try {
    await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log("✅ Email sent to:", to);
    console.log("📧 Subject:", subject);
  } catch (error) {
    console.error("❌ Brevo API error:", error.body || error.message);
    throw error;
  }
};

module.exports = sendEmail;