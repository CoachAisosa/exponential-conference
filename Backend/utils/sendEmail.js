const sendEmail = async ({ to, subject, text, html }) => {
  const url = "https://api.brevo.com/v3/smtp/email";

  const payload = {
    sender: {
      name: "Exponential Conference",
      email: process.env.EMAIL_USER,
    },
    to: [{ email: to }],
    subject: subject,
    htmlContent: html || `<p>${text || ""}</p>`,
    textContent: text || "",
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "accept": "application/json",
        "api-key": process.env.BREVO_API_KEY,
        "content-type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to send email via Brevo");
    }

    console.log("✅ Email sent to:", to);
  } catch (error) {
    console.error("❌ Brevo API Error:", error.message);
    throw error;
  }
};

module.exports = sendEmail;