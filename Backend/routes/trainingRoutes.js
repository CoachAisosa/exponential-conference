const express = require("express");
const router = express.Router();

const {
  getPublicTrainings,
  getAllTrainings,
  createTraining,
  updateTraining,
  deleteTraining,
  activateTraining,
} = require("../controllers/trainingController");

const { protect, adminOnly } = require("../middleware/authMiddleware");

// Public
router.get("/", getPublicTrainings);

// Admin
router.get("/all", protect, adminOnly, getAllTrainings);
router.post("/", protect, adminOnly, createTraining);
router.put("/:id", protect, adminOnly, updateTraining);
router.delete("/:id", protect, adminOnly, deleteTraining);
router.post("/:id/activate", protect, adminOnly, activateTraining);

module.exports = router;