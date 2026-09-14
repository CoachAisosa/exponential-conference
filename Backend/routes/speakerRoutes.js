const express = require("express");
const router = express.Router();
const {
  getSpeakers,
  getSpeakerById,
  createSpeaker,
  updateSpeaker,
  deleteSpeaker,
} = require("../controllers/speakerController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

// Public routes
router.get("/", getSpeakers);
router.get("/:id", getSpeakerById);

// Admin routes
router.post("/", protect, adminOnly, createSpeaker);
router.put("/:id", protect, adminOnly, updateSpeaker);
router.delete("/:id", protect, adminOnly, deleteSpeaker);

module.exports = router;