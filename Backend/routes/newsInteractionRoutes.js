const express = require("express");
const router = express.Router();
const {
  getInteractions,
  toggleLike,
  addComment,
  incrementShare,
  deleteComment,
} = require("../controllers/newsInteractionController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

// Public routes
router.get("/:newsId", getInteractions);
router.post("/:newsId/like", toggleLike);
router.post("/:newsId/comment", addComment);
router.post("/:newsId/share", incrementShare);

// Admin routes
router.delete(
  "/:newsId/comment/:commentId",
  protect,
  adminOnly,
  deleteComment
);

module.exports = router;