const express = require("express");
const router = express.Router();
const {
  getProgrammes,
  createProgramme,
  updateProgramme,
  deleteProgramme,
} = require("../controllers/programmeController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

// Public routes
router.get("/", getProgrammes);

// Admin routes
router.post("/", protect, adminOnly, createProgramme);
router.put("/:id", protect, adminOnly, updateProgramme);
router.delete("/:id", protect, adminOnly, deleteProgramme);

module.exports = router;