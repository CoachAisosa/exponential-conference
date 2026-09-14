const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
  time: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: "",
  },
  speaker: {
    type: String,
    default: "",
  },
  venue: {
    type: String,
    default: "Main Auditorium",
  },
});

const programmeSchema = new mongoose.Schema(
  {
    day: {
      type: Number,
      required: [true, "Day number is required"],
    },
    date: {
      type: String,
      required: [true, "Date is required"],
    },
    sessions: [sessionSchema],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Programme", programmeSchema);