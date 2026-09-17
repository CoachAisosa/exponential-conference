const express = require("express");
const router = express.Router();
const uploadImage = require("../middleware/cloudinaryMiddleware");
const { uploadImage: uploadController } = require("../controllers/uploadController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

router.post(
  "/",
  protect,
  adminOnly,
  uploadImage.single("image"),
  uploadController
);

module.exports = router;