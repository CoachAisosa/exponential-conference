const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

// ============================================================
// @desc    Admin Login
// @route   POST /api/auth/login
// @access  Public
// ============================================================
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide email and password.",
      });
    }

    // Find admin
    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    // Check password
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    // Return token
    res.status(200).json({
      success: true,
      message: "Login successful.",
      token: generateToken(user._id),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again.",
    });
  }
};

// ============================================================
// @desc    Register Admin (First-time setup only)
// @route   POST /api/auth/register
// @access  Public (should be disabled after setup)
// ============================================================
const registerAdmin = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Validate
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide name, email, and password.",
      });
    }

    // Check if user exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Admin with this email already exists.",
      });
    }

    // Create user
    const user = await User.create({
      name,
      email,
      password,
      role: role || "admin",
    });

    res.status(201).json({
      success: true,
      message: "Admin registered successfully.",
      token: generateToken(user._id),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again.",
    });
  }
};

// ============================================================
// @desc    Get Current Admin
// @route   GET /api/auth/me
// @access  Private
// ============================================================
const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("Get me error:", error);
    res.status(500).json({
      success: false,
      message: "Server error.",
    });
  }
};

// ============================================================
// @desc    Get all admins (superadmin only)
// @route   GET /api/auth/all
// @access  Private
// ============================================================
const getAllAdmins = async (req, res) => {
  try {
    const admins = await User.find().select("-password").sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: admins.length,
      admins,
    });
  } catch (error) {
    console.error("Get all admins error:", error);
    res.status(500).json({
      success: false,
      message: "Server error.",
    });
  }
};

// ============================================================
// @desc    Delete an admin (superadmin only)
// @route   DELETE /api/auth/:id
// @access  Private
// ============================================================
const deleteAdmin = async (req, res) => {
  try {
    const { id } = req.params;

    // Find admin
    const admin = await User.findById(id);

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found.",
      });
    }

    // Prevent deleting yourself
    if (req.user._id.toString() === id) {
      return res.status(400).json({
        success: false,
        message: "You cannot delete your own account.",
      });
    }

    // Prevent deleting the last superadmin
    if (admin.role === "superadmin") {
      const superadminCount = await User.countDocuments({ role: "superadmin" });
      if (superadminCount <= 1) {
        return res.status(400).json({
          success: false,
          message: "Cannot delete the last superadmin.",
        });
      }
    }

    await admin.deleteOne();

    res.status(200).json({
      success: true,
      message: `Admin "${admin.name}" deleted successfully.`,
    });
  } catch (error) {
    console.error("Delete admin error:", error);
    res.status(500).json({
      success: false,
      message: "Server error.",
    });
  }
};

module.exports = {
  loginAdmin,
  registerAdmin,
  getMe,
  getAllAdmins,
  deleteAdmin,
};