const express = require("express");
const router = express.Router();
const {
  createRegistration,
  getRegistrations,
  getRegistrationById,
  deleteRegistration,
  getRegistrationStats,
} = require("../controllers/registrationController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

// ============================================================
// PUBLIC ROUTES
// ============================================================

// @route   POST /api/registrations
// @desc    Create a new registration
// @access  Public
router.post("/", createRegistration);

// ============================================================
// PROTECTED ROUTES (Admin only)
// ============================================================

// @route   GET /api/registrations/stats
// @desc    Get registration statistics
// @access  Private
router.get("/stats", protect, adminOnly, getRegistrationStats);

// @route   GET /api/registrations
// @desc    Get all registrations (with search & filter)
// @access  Private
router.get("/", protect, adminOnly, getRegistrations);

// @route   GET /api/registrations/:id
// @desc    Get single registration
// @access  Private
router.get("/:id", protect, adminOnly, getRegistrationById);

// @route   DELETE /api/registrations/:id
// @desc    Delete registration
// @access  Private
router.delete("/:id", protect, adminOnly, deleteRegistration);

module.exports = router;