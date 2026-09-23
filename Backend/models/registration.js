const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    country: {
      type: String,
      required: true,
      trim: true,
    },

    state: {
      type: String,
      required: true,
      trim: true,
    },

    city: {
      type: String,
      required: true,
      trim: true,
    },

    churchOrganisation: {
      type: String,
      trim: true,
      default: "N/A",
    },

    leadershipRole: {
      type: String,
      trim: true,
      default: "N/A",
    },

    registrationCategory: {
      type: String,
      required: true,
      trim: true,
    },

    attendanceType: {
     type: String,
     enum: ["online", "physical"],
     default: "physical",
     required: true,
    },

    message: {
      type: String,
      trim: true,
      default: "N/A",
    },

    // ============================================================
    // PAYMENT FIELDS
    // ============================================================
    paymentStatus: {
      type: String,
      enum: ["pending", "submitted", "approved", "rejected"],
      default: "pending",
    },

    paymentMethod: {
      type: String,
      enum: ["bank-transfer", "selar", "whatsapp", "none"],
      default: "none",
    },

    receiptUploadedAt: {
      type: Date,
    },

    // ============================================================
    // RECEIPT STORAGE (Base64)
    // ============================================================
    receiptData: {
      type: String,      // Base64 encoded file
      default: "",
    },

    receiptMimeType: {
      type: String,      // e.g., "image/jpeg", "application/pdf"
      default: "",
    },

    receiptFileName: {
      type: String,      // Original filename
      default: "",
    },

    // Legacy field — kept for backward compatibility
    receiptUrl: {
      type: String,
      default: "",
    },

    // ============================================================
    // ACCESS CODE FIELDS
    // ============================================================
    accessCode: {
      type: String,
      default: "",
    },

    accessCodeGeneratedAt: {
      type: Date,
    },

    accessCodeUsed: {
      type: Boolean,
      default: false,
    },

    adminNote: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Registration", registrationSchema);