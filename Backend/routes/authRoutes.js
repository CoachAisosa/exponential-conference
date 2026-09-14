const express = require("express");
const router = express.Router();
const {
  loginAdmin,
  registerAdmin,
  getMe,
  getAllAdmins,
  deleteAdmin,
} = require("../controllers/authController");
const { protect, superAdminOnly } = require("../middleware/authMiddleware");

// @route   POST /api/auth/login
router.post("/login", loginAdmin);

// @route   POST /api/auth/register
router.post("/register", registerAdmin);

// @route   GET /api/auth/me
router.get("/me", protect, getMe);

// Superadmin only routes
router.get("/all", protect, superAdminOnly, getAllAdmins);
router.delete("/:id", protect, superAdminOnly, deleteAdmin);


module.exports = router;