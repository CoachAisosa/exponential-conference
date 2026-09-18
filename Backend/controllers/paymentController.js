const Registration = require("../models/registration");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");

// ============================================================
// @desc    Upload payment receipt (Base64 → MongoDB)
// @route   POST /api/payments/upload-receipt/:registrationId
// @access  Public
// ============================================================
const uploadReceipt = async (req, res) => {
  try {
    const { registrationId } = req.params;
    const { paymentMethod } = req.body;

    const registration = await Registration.findById(registrationId);

    if (!registration) {
      return res.status(404).json({
        success: false,
        message: "Registration not found.",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload a receipt file.",
      });
    }

    // ✅ Convert file to Base64
    const base64Data = req.file.buffer.toString("base64");

    // Save to MongoDB
    registration.receiptData = base64Data;
    registration.receiptMimeType = req.file.mimetype;
    registration.receiptFileName = req.file.originalname;
    registration.receiptUrl = ""; // No file URL anymore
    registration.receiptUploadedAt = new Date();
    registration.paymentMethod = paymentMethod || "bank-transfer";
    registration.paymentStatus = "submitted";

    await registration.save();

    // Notify admin
    try {
      await sendEmail({
        to: process.env.EMAIL_TO,
        subject: `💳 Payment Receipt Uploaded: ${registration.fullName}`,
        text: `${registration.fullName} uploaded a payment receipt.`,
        html: `
          <div style="font-family: Arial; max-width: 600px; margin: 0 auto;">
            <div style="background: #1a2a4a; color: white; padding: 20px; text-align: center;">
              <h1 style="margin: 0;">💳 Payment Receipt Uploaded</h1>
              <p style="color: #e87a2a; margin: 5px 0 0 0;">Exponential Conference 2026</p>
            </div>
            <div style="padding: 20px; background: #f8f9fa;">
              <p><strong>Name:</strong> ${registration.fullName}</p>
              <p><strong>Email:</strong> ${registration.email}</p>
              <p><strong>Phone:</strong> ${registration.phone}</p>
              <p><strong>Category:</strong> ${registration.registrationCategory}</p>
              <p><strong>Payment Method:</strong> ${paymentMethod}</p>
              <p style="margin-top: 20px;">Login to your admin dashboard to approve this payment.</p>
            </div>
          </div>
        `,
      });
    } catch (err) {
      console.error("Email error:", err.message);
    }

    res.status(200).json({
      success: true,
      message: "Receipt uploaded successfully. Awaiting admin approval.",
      registration: {
        ...registration.toObject(),
        receiptData: undefined, // Don't send Base64 back
      },
    });
  } catch (error) {
    console.error("Upload receipt error:", error);
    res.status(500).json({
      success: false,
      message: "Server error.",
    });
  }
};

// ============================================================
// @desc    Approve payment and generate access code (Admin)
// @route   POST /api/payments/approve/:registrationId
// @access  Private
// ============================================================
const approvePayment = async (req, res) => {
  try {
    const { registrationId } = req.params;

    const registration = await Registration.findById(registrationId);

    if (!registration) {
      return res.status(404).json({
        success: false,
        message: "Registration not found.",
      });
    }

    // Generate unique access code
    const accessCode = `EXP-${crypto
      .randomBytes(3)
      .toString("hex")
      .toUpperCase()}-${Date.now().toString().slice(-4)}`;

    registration.paymentStatus = "approved";
    registration.accessCode = accessCode;
    registration.accessCodeGeneratedAt = new Date();
    registration.accessCodeUsed = false;

    await registration.save();

    // ============================================================
    // 1. Send access code to ATTENDEE
    // ============================================================
    try {
      await sendEmail({
        to: registration.email,
        subject: `🎉 Payment Approved — Your Access Code for Exponential Conference 2026`,
        text: `Your access code is: ${accessCode}`,
        html: `
          <div style="font-family: Arial; max-width: 600px; margin: 0 auto;">
            <div style="background: #1a2a4a; color: white; padding: 30px 20px; text-align: center;">
              <div style="width: 60px; height: 60px; background: #e87a2a; border-radius: 50%; margin: 0 auto 15px; line-height: 60px; font-size: 30px;">✅</div>
              <h1 style="margin: 0;">Payment Approved</h1>
              <p style="color: #e87a2a; margin: 5px 0 0 0;">Exponential Conference 2026</p>
            </div>
            <div style="padding: 30px; background: #ffffff;">
              <h2 style="color: #1a2a4a;">Dear ${registration.fullName},</h2>
              <p style="color: #4a5a7a; line-height: 1.8;">
                Great news! Your payment has been verified and approved. 
                Below is your unique access code to view the Live Stream on the conference website.
              </p>
              
              <div style="background: #1a2a4a; padding: 25px; border-radius: 12px; text-align: center; margin: 25px 0;">
                <p style="margin: 0; color: rgba(255,255,255,0.7); font-size: 12px; letter-spacing: 2px;">YOUR ACCESS CODE</p>
                <h1 style="color: #e87a2a; margin: 10px 0; font-size: 32px; letter-spacing: 3px;">${accessCode}</h1>
                <p style="margin: 0; color: rgba(255,255,255,0.5); font-size: 11px;">Keep this code safe. Do not share it.</p>
              </div>

              <h3 style="color: #1a2a4a;">How to Use Your Code</h3>
              <ol style="color: #4a5a7a; line-height: 2; padding-left: 20px;">
                <li>Go to the Live Event page on the website</li>
                <li>Enter your access code</li>
                <li>Enjoy the live stream!</li>
              </ol>

              <div style="text-align: center; margin: 30px 0;">
                <a href="https://exponentialconference.org/live" 
                   style="background: #e87a2a; color: white; padding: 14px 35px; text-decoration: none; border-radius: 50px; font-weight: bold;">
                  Go to Live Page
                </a>
              </div>
            </div>
            <div style="background: #1a2a4a; color: white; padding: 15px; text-align: center; font-size: 12px;">
              <p style="margin: 0;">Exponential Conference 2026 — Raising Leaders Who Multiply</p>
            </div>
          </div>
        `,
      });
      console.log("✅ Access code email sent to attendee");
    } catch (emailError) {
      console.error("Access code email error:", emailError.message);
    }

    // ============================================================
    // 2. Also notify ADMIN
    // ============================================================
    try {
      await sendEmail({
        to: process.env.EMAIL_TO,
        subject: `✅ Payment Approved: ${registration.fullName} — Code: ${accessCode}`,
        text: `Payment approved for ${registration.fullName}. Access code: ${accessCode}`,
        html: `
          <div style="font-family: Arial; max-width: 600px; margin: 0 auto;">
            <div style="background: #1a2a4a; color: white; padding: 20px; text-align: center;">
              <h1 style="margin: 0;">✅ Payment Approved</h1>
              <p style="color: #e87a2a; margin: 5px 0 0 0;">Exponential Conference 2026</p>
            </div>
            <div style="padding: 25px; background: #f8f9fa;">
              <p><strong>Attendee:</strong> ${registration.fullName}</p>
              <p><strong>Email:</strong> ${registration.email}</p>
              <p><strong>Phone:</strong> ${registration.phone}</p>
              <p><strong>Category:</strong> ${registration.registrationCategory}</p>
              
              <div style="background: #1a2a4a; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0;">
                <p style="margin: 0; color: rgba(255,255,255,0.7); font-size: 12px;">ACCESS CODE SENT</p>
                <h2 style="color: #e87a2a; margin: 8px 0; letter-spacing: 2px;">${accessCode}</h2>
              </div>

              <p style="color: #7a8aaa; font-size: 12px;">
                The attendee has received this code via email. 
                They can now access the live stream.
              </p>
            </div>
          </div>
        `,
      });
      console.log("✅ Admin notification sent");
    } catch (emailError) {
      console.error("Admin email error:", emailError.message);
    }

    // ============================================================
    // 3. Return success response
    // ============================================================
    res.status(200).json({
      success: true,
      message: "Payment approved. Access code sent to attendee.",
      accessCode,
      registration,
    });
  } catch (error) {
    console.error("Approve payment error:", error);
    res.status(500).json({
      success: false,
      message: "Server error.",
    });
  }
};

// ============================================================
// @desc    Reject payment (Admin)
// @route   POST /api/payments/reject/:registrationId
// @access  Private
// ============================================================
const rejectPayment = async (req, res) => {
  try {
    const { registrationId } = req.params;
    const { reason } = req.body;

    const registration = await Registration.findById(registrationId);

    if (!registration) {
      return res.status(404).json({
        success: false,
        message: "Registration not found.",
      });
    }

    registration.paymentStatus = "rejected";
    registration.adminNote = reason || "Payment could not be verified.";
    await registration.save();

    // Notify attendee
    try {
      await sendEmail({
        to: registration.email,
        subject: `⚠️ Payment Issue — Exponential Conference 2026`,
        text: `Your payment could not be verified. Reason: ${reason}`,
        html: `
          <div style="font-family: Arial; max-width: 600px; margin: 0 auto;">
            <div style="background: #1a2a4a; color: white; padding: 20px; text-align: center;">
              <h1 style="margin: 0;">⚠️ Payment Issue</h1>
              <p style="color: #e87a2a; margin: 5px 0 0 0;">Exponential Conference 2026</p>
            </div>
            <div style="padding: 25px; background: #f8f9fa;">
              <p>Dear ${registration.fullName},</p>
              <p>We could not verify your payment receipt. Please contact us for assistance.</p>
              <p><strong>Reason:</strong> ${reason}</p>
              <p>WhatsApp: 08062854749<br>Email: abuexpocon@gmail.com</p>
            </div>
          </div>
        `,
      });
    } catch (err) {
      console.error("Rejection email error:", err.message);
    }

    res.status(200).json({
      success: true,
      message: "Payment rejected.",
      registration,
    });
  } catch (error) {
    console.error("Reject payment error:", error);
    res.status(500).json({
      success: false,
      message: "Server error.",
    });
  }
};

// ============================================================
// @desc    Verify access code (Public)
// @route   POST /api/payments/verify-code
// @access  Public
// ============================================================
const verifyAccessCode = async (req, res) => {
  try {
    const { accessCode } = req.body;

    if (!accessCode) {
      return res.status(400).json({
        success: false,
        message: "Access code required.",
      });
    }

    const registration = await Registration.findOne({
      accessCode: accessCode.trim().toUpperCase(),
      paymentStatus: "approved",
    });

    if (!registration) {
      return res.status(401).json({
        success: false,
        message: "Invalid access code. Please check and try again.",
      });
    }

    // Mark as used (optional)
    if (!registration.accessCodeUsed) {
      registration.accessCodeUsed = true;
      await registration.save();
    }

    res.status(200).json({
      success: true,
      message: "Access granted. Welcome to the live stream!",
      user: {
        name: registration.fullName,
        email: registration.email,
        category: registration.registrationCategory,
      },
    });
  } catch (error) {
    console.error("Verify code error:", error);
    res.status(500).json({
      success: false,
      message: "Server error.",
    });
  }
};

// ============================================================
// @desc    Get all payments with status (Admin)
// @route   GET /api/payments/all
// @access  Private
// ============================================================
const getAllPayments = async (req, res) => {
  try {
    const { status } = req.query;

    let filter = {};
    if (status) {
      filter.paymentStatus = status;
    } else {
      filter.paymentStatus = { $in: ["submitted", "approved", "rejected"] };
    }

    // Exclude receiptData from listing (it's heavy — only fetch on demand)
    const payments = await Registration.find(filter)
      .select("-receiptData")
      .sort({ receiptUploadedAt: -1 });

    res.status(200).json({
      success: true,
      count: payments.length,
      payments,
    });
  } catch (error) {
    console.error("Get payments error:", error);
    res.status(500).json({
      success: false,
      message: "Server error.",
    });
  }
};

// ============================================================
// @desc    Get receipt image for a registration (Admin)
// @route   GET /api/payments/receipt/:registrationId
// @access  Private
// ============================================================
const getReceiptImage = async (req, res) => {
  try {
    const { registrationId } = req.params;

    const registration = await Registration.findById(registrationId);

    if (!registration || !registration.receiptData) {
      return res.status(404).json({
        success: false,
        message: "Receipt not found.",
      });
    }

    // Convert Base64 back to buffer
    const imageBuffer = Buffer.from(registration.receiptData, "base64");

    // Set content type
    res.set("Content-Type", registration.receiptMimeType || "image/jpeg");
    res.set("Content-Disposition", "inline");

    // Send image
    res.send(imageBuffer);
  } catch (error) {
    console.error("Get receipt error:", error);
    res.status(500).json({
      success: false,
      message: "Server error.",
    });
  }
};

module.exports = {
  uploadReceipt,
  approvePayment,
  rejectPayment,
  verifyAccessCode,
  getAllPayments,
  getReceiptImage,
};