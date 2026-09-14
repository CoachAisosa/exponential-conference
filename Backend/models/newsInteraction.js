const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
    },
    text: {
      type: String,
      required: true,
      trim: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  }
);

const newsInteractionSchema = new mongoose.Schema(
  {
    newsId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "News",
      required: true,
      unique: true,
    },
    likes: [
      {
        visitorId: String, // Anonymous visitor ID from localStorage
        likedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    comments: [commentSchema],
    shares: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("NewsInteraction", newsInteractionSchema);