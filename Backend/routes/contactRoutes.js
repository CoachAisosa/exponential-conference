const express = require("express");
const router = express.Router();
const {
  createContact,
  getContacts,
  deleteContact,
} = require("../controllers/contactController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

// @route   POST /api/contacts
// @access  Public
router.post("/", createContact);

// @route   GET /api/contacts
// @access  Private (Admin)
router.get("/", protect, adminOnly, getContacts);

// @route   DELETE /api/contacts/:id
// @access  Private (Admin)
router.delete("/:id", protect, adminOnly, deleteContact);

module.exports = router;