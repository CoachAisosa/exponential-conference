const express = require("express");
const router = express.Router();

const {
  getSettingByKey,
  getBookSettings,
  updateBookSettings,
  setSettingByKey,
} = require("../controllers/settingController");

const { protect, adminOnly } = require("../middleware/authMiddleware");

// Public
router.get("/book", getBookSettings);
router.get("/:key", getSettingByKey);

// Admin
router.put("/book", protect, adminOnly, updateBookSettings);
router.put("/:key", protect, adminOnly, setSettingByKey);

module.exports = router;