const mongoose = require("mongoose");

const speakerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    role: {
      type: String,
      default: "Conference Speaker",
      trim: true,
    },
    image: {
      type: String,
      default: "",
    },
    imagePosition: {
      type: String,
      enum: ["top", "upper", "center", "lower", "bottom"],
      default: "upper",
    },
    bio: {
      type: String,
      required: [true, "Bio is required"],
      trim: true,
    },
    focus: {
      type: String,
      default: "",
      trim: true,
    },
    order: {
      type: Number,
      default: 0,
    },
    published: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Speaker", speakerSchema);