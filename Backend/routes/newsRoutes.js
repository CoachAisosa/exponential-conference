const express = require("express");
const router = express.Router();
const {
  getNews,
  getFeaturedNews,
  getNewsById,
  createNews,
  updateNews,
  deleteNews,
} = require("../controllers/newsController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

// Public routes
router.get("/", getNews);
router.get("/featured", getFeaturedNews);
router.get("/:id", getNewsById);

// Admin routes
router.post("/", protect, adminOnly, createNews);
router.put("/:id", protect, adminOnly, updateNews);
router.delete("/:id", protect, adminOnly, deleteNews);

module.exports = router;