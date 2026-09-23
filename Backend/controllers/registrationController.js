const Registration = require("../models/registration");
const sendEmail = require("../utils/sendEmail");

// ============================================================
// @desc    Create a new registration
// @route   POST /api/registrations
// @access  Public
// ============================================================
const createRegistration = async (req, res) => {
  try {
    const {
      fullName,
      email,
      phone,
      country,
      state,
      city,
      churchOrganisation,
      leadershipRole,
      registrationCategory,
      attendanceType, 
      message,
    } = req.body;

    if (
      !fullName ||
      !email ||
      !phone ||
      !country ||
      !state ||
      !city ||
      !registrationCategory ||
      !attendanceType
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields.",
      });
    }

    const existingRegistration = await Registration.findOne({
      email: email.toLowerCase(),
    });

    if (existingRegistration) {
      return res.status(409).json({
        success: false,
        message: "This email has already been registered.",
      });
    }

    const registration = await Registration.create({
      fullName,
      email,
      phone,
      country,
      state,
      city,
      churchOrganisation,
      leadershipRole,
      registrationCategory,
      attendanceType, 
      message,
    });

    // Send email notification
    try {
      await sendEmail({
        to: process.env.EMAIL_TO,
        subject: `🎉 New Registration: ${fullName}`,
        text: `New registration from ${fullName}`,
        html: `
          <div style="font-family: Arial; max-width: 600px; margin: 0 auto;">
            <div style="background: #1a2a4a; color: white; padding: 20px; text-align: center;">
              <h1 style="margin: 0;">🎉 New Registration</h1>
              <p style="color: #e87a2a; margin: 5px 0 0 0;">Exponential Conference 2026</p>
            </div>
            <div style="padding: 20px; background: #f8f9fa;">
              <p><strong>Name:</strong> ${fullName}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Phone:</strong> ${phone}</p>
              <p><strong>Country:</strong> ${country}</p>
              <p><strong>State:</strong> ${state}</p>
              <p><strong>City:</strong> ${city}</p>
              <p><strong>Church/Org:</strong> ${churchOrganisation || "N/A"}</p>
              <p><strong>Role:</strong> ${leadershipRole || "N/A"}</p>
              <p><strong>Category:</strong> ${registrationCategory}</p>
              <p><strong>Attendance:</strong> ${attendanceType === "online" ? "Online" : "Physical"}</p>
              <p><strong>Message:</strong> ${message || "N/A"}</p>
            </div>
          </div>
        `,
      });
    } catch (emailError) {
      console.error("⚠️ Email failed:", emailError.message);
    }

    res.status(201).json({
      success: true,
      message: "Registration successful.",
      registration,
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again.",
    });
  }
};

// ============================================================
// @desc    Get all registrations
// @route   GET /api/registrations
// @access  Private (Admin)
// ============================================================
const getRegistrations = async (req, res) => {
  try {
    const { search, category, country } = req.query;

    // Build filter
    let filter = {};

    if (search) {
      filter.$or = [
        { fullName: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } },
        { churchOrganisation: { $regex: search, $options: "i" } },
      ];
    }

    if (category) {
      filter.registrationCategory = category;
    }

    if (country) {
      filter.country = { $regex: country, $options: "i" };
    }

    const registrations = await Registration.find(filter).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: registrations.length,
      registrations,
    });
  } catch (error) {
    console.error("Get registrations error:", error);
    res.status(500).json({
      success: false,
      message: "Server error.",
    });
  }
};

// ============================================================
// @desc    Get single registration
// @route   GET /api/registrations/:id
// @access  Private (Admin)
// ============================================================
const getRegistrationById = async (req, res) => {
  try {
    const registration = await Registration.findById(req.params.id);

    if (!registration) {
      return res.status(404).json({
        success: false,
        message: "Registration not found.",
      });
    }

    res.status(200).json({
      success: true,
      registration,
    });
  } catch (error) {
    console.error("Get registration error:", error);
    res.status(500).json({
      success: false,
      message: "Server error.",
    });
  }
};

// ============================================================
// @desc    Delete registration
// @route   DELETE /api/registrations/:id
// @access  Private (Admin)
// ============================================================
const deleteRegistration = async (req, res) => {
  try {
    const registration = await Registration.findById(req.params.id);

    if (!registration) {
      return res.status(404).json({
        success: false,
        message: "Registration not found.",
      });
    }

    await registration.deleteOne();

    res.status(200).json({
      success: true,
      message: "Registration deleted successfully.",
    });
  } catch (error) {
    console.error("Delete registration error:", error);
    res.status(500).json({
      success: false,
      message: "Server error.",
    });
  }
};

// ============================================================
// @desc    Get dashboard stats
// @route   GET /api/registrations/stats
// @access  Private (Admin)
// ============================================================
const getRegistrationStats = async (req, res) => {
  try {
    const total = await Registration.countDocuments();

    // Category counts
    const individual = await Registration.countDocuments({
      registrationCategory: "individual",
    });
    const churchGroup = await Registration.countDocuments({
      registrationCategory: "church-group",
    });
    const ministerPastor = await Registration.countDocuments({
      registrationCategory: "minister-pastor",
    });
    const student = await Registration.countDocuments({
      registrationCategory: "student-emerging-leader",
    });

    // Recent registrations (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const recent = await Registration.countDocuments({
      createdAt: { $gte: sevenDaysAgo },
    });


    // ✅ NEW: Payment status counts
    const approved = await Registration.countDocuments({
      paymentStatus: "approved",
    });
    const pending = await Registration.countDocuments({
      paymentStatus: "submitted",
    });
    const rejected = await Registration.countDocuments({
      paymentStatus: "rejected",
    });

    res.status(200).json({
      success: true,
      stats: {
        total,
        recent,
        approved,     
        pending,      
        rejected,     
        categories: {
          individual,
          churchGroup,
          ministerPastor,
          student,
        },
      },
    });
  } catch (error) {
    console.error("Stats error:", error);
    res.status(500).json({
      success: false,
      message: "Server error.",
    });
  }
};

module.exports = {
  createRegistration,
  getRegistrations,
  getRegistrationById,
  deleteRegistration,
  getRegistrationStats,
};