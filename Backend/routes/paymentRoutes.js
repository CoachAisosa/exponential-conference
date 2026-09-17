const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMiddleware");
const {
  uploadReceipt,
  approvePayment,
  rejectPayment,
  verifyAccessCode,
  getAllPayments,
  getReceiptImage
} = require("../controllers/paymentController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

// Public routes
router.post("/upload-receipt/:registrationId", upload.single("receipt"), uploadReceipt);
router.post("/verify-code", verifyAccessCode);

// Admin routes
router.get("/all", protect, adminOnly, getAllPayments);
router.get("/receipt/:registrationId", protect, adminOnly, getReceiptImage); 
router.post("/approve/:registrationId", protect, adminOnly, approvePayment);
router.post("/reject/:registrationId", protect, adminOnly, rejectPayment);

module.exports = router;