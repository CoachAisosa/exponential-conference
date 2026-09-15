const brevo = require("@getbrevo/brevo");

const sendEmail = async ({ to, subject, text, html }) => {
  try {
    // Correct way to instantiate the API client
    const apiInstance = new brevo.TransactionalEmailsApi();
    
    // Correct way to set the API key
    apiInstance.setApiKey(
      brevo.TransactionalEmailsApiApiKeys.apiKey,
      process.env.BREVO_API_KEY
    );

    const sendSmtpEmail = new brevo.SendSmtpEmail();
    sendSmtpEmail.subject = subject;
    sendSmtpEmail.htmlContent = html || `<p>${text || ""}</p>`;
    sendSmtpEmail.textContent = text || "";
    sendSmtpEmail.sender = {
      name: "Exponential Conference",
      email: process.env.EMAIL_USER,
    };
    sendSmtpEmail.to = [{ email: to }];

    await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log("✅ Email sent to:", to);
  } catch (error) {
    console.error("❌ Brevo API error:", error.body || error.message);
    throw error;
  }
};

module.exports = sendEmail;