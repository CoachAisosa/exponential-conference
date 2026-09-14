const mongoose = require("mongoose");

const conferenceSchema = new mongoose.Schema(
  {
    year: {
      type: Number,
      required: [true, "Year is required"],
      unique: true,
    },
    theme: {
      type: String,
      required: [true, "Theme is required"],
      trim: true,
    },
    subtitle: {
      type: String,
      default: "Raising Leaders Who Multiply",
      trim: true,
    },
    date: {
      type: String,
      required: [true, "Date is required"],
    },
    venue: {
      type: String,
      required: [true, "Venue is required"],
    },
    address: {
      type: String,
      default: "",
    },
    city: {
      type: String,
      default: "Benin City",
    },
    state: {
      type: String,
      default: "Edo State",
    },
    country: {
      type: String,
      default: "Nigeria",
    },
    registrationOpen: {
      type: Boolean,
      default: true,
    },
    description: {
      type: String,
      default: "",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Conference", conferenceSchema);