const express = require("express");
const router = express.Router();
const {
  getActiveConference,
  getAllConferences,
  createConference,
  updateConference,
  deleteConference,
} = require("../controllers/conferenceController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

// Public routes
router.get("/", getActiveConference);

// Admin routes
router.get("/all", protect, adminOnly, getAllConferences);
router.post("/", protect, adminOnly, createConference);
router.put("/:id", protect, adminOnly, updateConference);
router.delete("/:id", protect, adminOnly, deleteConference);

module.exports = router;