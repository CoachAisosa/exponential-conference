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

    message: {
      type: String,
      trim: true,
      default: "N/A",
    },


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

receiptUrl: {
  type: String,
  default: "",
},

receiptUploadedAt: {
  type: Date,
},

accessCode: {
  type: String,
  default: "",
  unique: false, 
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