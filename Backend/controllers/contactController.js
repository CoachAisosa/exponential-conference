const Contact = require("../models/contact");
const sendEmail = require("../utils/sendEmail");

// ============================================================
// @desc    Submit contact form
// @route   POST /api/contacts
// @access  Public
// ============================================================
const createContact = async (req, res) => {
  try {
    const { fullName, email, phone, subject, message } = req.body;

    // Validate required fields
    if (!fullName || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields.",
      });
    }

    // Save to MongoDB
    const contact = await Contact.create({
      fullName,
      email,
      phone: phone || "N/A",
      subject,
      message,
    });

    // 📧 Send email notification to admin
    try {
      await sendEmail({
        to: process.env.EMAIL_TO,
        subject: `📬 New Contact Message: ${subject}`,
        text: `New message from ${fullName} (${email})`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
            
            <!-- HEADER -->
            <div style="background: #1a2a4a; color: #ffffff; padding: 25px 20px; text-align: center;">
              <h1 style="margin: 0; font-size: 20px; letter-spacing: 1px;">📬 New Contact Message</h1>
              <p style="color: #e87a2a; margin: 8px 0 0 0; font-size: 14px; letter-spacing: 2px;">EXPONENTIAL CONFERENCE 2026</p>
            </div>

            <!-- BODY -->
            <div style="padding: 25px 20px; background: #f8f9fa;">
              <table style="width: 100%; border-collapse: collapse; background: #ffffff; border-radius: 8px; overflow: hidden;">
                <tr>
                  <td style="padding: 12px 15px; background: #f0f1f3; font-weight: bold; width: 35%; font-size: 13px; color: #1a2a4a; border-bottom: 1px solid #eef0f3;">Full Name</td>
                  <td style="padding: 12px 15px; font-size: 13px; color: #1a2a4a; border-bottom: 1px solid #eef0f3;">${fullName}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 15px; background: #f0f1f3; font-weight: bold; font-size: 13px; color: #1a2a4a; border-bottom: 1px solid #eef0f3;">Email</td>
                  <td style="padding: 12px 15px; font-size: 13px; color: #1a2a4a; border-bottom: 1px solid #eef0f3;">
                    <a href="mailto:${email}" style="color: #e87a2a;">${email}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 15px; background: #f0f1f3; font-weight: bold; font-size: 13px; color: #1a2a4a; border-bottom: 1px solid #eef0f3;">Phone / WhatsApp</td>
                  <td style="padding: 12px 15px; font-size: 13px; color: #1a2a4a; border-bottom: 1px solid #eef0f3;">${phone || "N/A"}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 15px; background: #f0f1f3; font-weight: bold; font-size: 13px; color: #1a2a4a; border-bottom: 1px solid #eef0f3;">Subject</td>
                  <td style="padding: 12px 15px; font-size: 13px; color: #1a2a4a; border-bottom: 1px solid #eef0f3;">${subject}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 15px; background: #f0f1f3; font-weight: bold; font-size: 13px; color: #1a2a4a; border-bottom: 1px solid #eef0f3; vertical-align: top;">Message</td>
                  <td style="padding: 12px 15px; font-size: 13px; color: #1a2a4a; border-bottom: 1px solid #eef0f3; line-height: 1.6;">${message}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 15px; background: #f0f1f3; font-weight: bold; font-size: 13px; color: #1a2a4a;">Received At</td>
                  <td style="padding: 12px 15px; font-size: 13px; color: #1a2a4a;">${new Date().toLocaleString()}</td>
                </tr>
              </table>
            </div>

            <!-- FOOTER -->
            <div style="background: #1a2a4a; color: #ffffff; padding: 15px 20px; text-align: center; font-size: 12px;">
              <p style="margin: 0; color: rgba(255,255,255,0.7);">Exponential Conference 2026</p>
              <p style="margin: 5px 0 0 0; color: rgba(255,255,255,0.5); font-size: 11px;">Reply directly to this email to respond to ${fullName}</p>
            </div>
          </div>
        `,
      });
      console.log("✅ Contact email sent to admin");
    } catch (emailError) {
      console.error("⚠️ Contact email failed:", emailError.message);
    }

    // 📧 Send auto-reply to the person who contacted
    try {
      await sendEmail({
        to: email,
        subject: `✅ We received your message — Exponential Conference 2026`,
        text: `Thank you ${fullName}, we received your message.`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
            
            <!-- HEADER -->
            <div style="background: #1a2a4a; color: #ffffff; padding: 30px 20px; text-align: center;">
              <div style="width: 60px; height: 60px; background: #e87a2a; border-radius: 50%; margin: 0 auto 15px; line-height: 60px; font-size: 30px;">✅</div>
              <h1 style="margin: 0; font-size: 22px;">Message Received</h1>
              <p style="color: #e87a2a; margin: 10px 0 0 0; font-size: 14px; letter-spacing: 2px;">EXPONENTIAL CONFERENCE 2026</p>
            </div>

            <!-- BODY -->
            <div style="padding: 30px 25px;">
              <h2 style="color: #1a2a4a; margin: 0 0 15px 0; font-size: 20px;">Dear ${fullName},</h2>
              
              <p style="color: #4a5a7a; line-height: 1.8; font-size: 15px;">
                Thank you for reaching out to the Exponential Conference team. 
                We have received your message and will respond to you as soon as possible.
              </p>

              <!-- Message Summary -->
              <div style="background: #f8f9fa; padding: 20px; border-left: 4px solid #e87a2a; border-radius: 4px; margin: 25px 0;">
                <p style="margin: 0 0 10px 0; font-size: 12px; color: #7a8aaa; letter-spacing: 1px; text-transform: uppercase;">Your Message</p>
                <p style="margin: 5px 0; font-size: 14px; color: #1a2a4a;"><strong>Subject:</strong> ${subject}</p>
                <p style="margin: 10px 0 0 0; font-size: 14px; color: #4a5a7a; line-height: 1.6;">${message}</p>
              </div>

              <p style="color: #4a5a7a; line-height: 1.8; font-size: 15px;">
                In the meantime, feel free to:
              </p>
              
              <ul style="color: #4a5a7a; line-height: 2; font-size: 14px; padding-left: 20px;">
                <li>Explore our <a href="https://abuexponential.org/speakers" style="color: #e87a2a;">Speakers</a></li>
                <li>View the <a href="https://abuexponential.org/programme" style="color: #e87a2a;">Programme</a></li>
                <li>Register for the conference: <a href="https://abuexponential.org/register" style="color: #e87a2a;">Register Now</a></li>
              </ul>

              <p style="color: #4a5a7a; line-height: 1.8; font-size: 15px; margin-top: 25px;">
                We look forward to hearing from you!
              </p>
            </div>

            <!-- FOOTER -->
            <div style="background: #1a2a4a; color: #ffffff; padding: 20px; text-align: center; font-size: 12px;">
              <p style="margin: 0; color: rgba(255,255,255,0.8); font-weight: bold; letter-spacing: 1px;">EXPONENTIAL CONFERENCE 2026</p>
              <p style="margin: 5px 0 0 0; color: rgba(255,255,255,0.5);">Raising Leaders Who Multiply</p>
              <p style="margin: 10px 0 0 0; color: rgba(255,255,255,0.3); font-size: 11px;">© 2026 Exponential Conference. All Rights Reserved.</p>
            </div>
          </div>
        `,
      });
      console.log("✅ Auto-reply sent to:", email);
    } catch (emailError) {
      console.error("⚠️ Auto-reply failed:", emailError.message);
    }

    res.status(201).json({
      success: true,
      message: "Message sent successfully.",
      contact,
    });
  } catch (error) {
    console.error("Contact error:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again.",
    });
  }
};

// ============================================================
// @desc    Get all contacts (Admin)
// @route   GET /api/contacts
// @access  Private
// ============================================================
const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: contacts.length,
      contacts,
    });
  } catch (error) {
    console.error("Get contacts error:", error);
    res.status(500).json({
      success: false,
      message: "Server error.",
    });
  }
};

// ============================================================
// @desc    Delete a contact (Admin)
// @route   DELETE /api/contacts/:id
// @access  Private
// ============================================================
const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Contact not found.",
      });
    }

    await contact.deleteOne();

    res.status(200).json({
      success: true,
      message: "Contact deleted successfully.",
    });
  } catch (error) {
    console.error("Delete contact error:", error);
    res.status(500).json({
      success: false,
      message: "Server error.",
    });
  }
};

module.exports = {
  createContact,
  getContacts,
  deleteContact,
};