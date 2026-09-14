const Conference = require("../models/Conference");

// @desc    Get active conference
// @route   GET /api/conference
// @access  Public
const getActiveConference = async (req, res) => {
  try {
    const conference = await Conference.findOne({ isActive: true });

    if (!conference) {
      return res.status(404).json({
        success: false,
        message: "No active conference found.",
      });
    }

    res.status(200).json({
      success: true,
      conference,
    });
  } catch (error) {
    console.error("Get conference error:", error);
    res.status(500).json({
      success: false,
      message: "Server error.",
    });
  }
};

// @desc    Get all conferences (admin)
// @route   GET /api/conference/all
// @access  Private
const getAllConferences = async (req, res) => {
  try {
    const conferences = await Conference.find().sort({ year: -1 });

    res.status(200).json({
      success: true,
      count: conferences.length,
      conferences,
    });
  } catch (error) {
    console.error("Get all conferences error:", error);
    res.status(500).json({
      success: false,
      message: "Server error.",
    });
  }
};

// @desc    Create conference (admin)
// @route   POST /api/conference
// @access  Private
const createConference = async (req, res) => {
  try {
    const conference = await Conference.create(req.body);

    res.status(201).json({
      success: true,
      message: "Conference created successfully.",
      conference,
    });
  } catch (error) {
    console.error("Create conference error:", error);
    res.status(500).json({
      success: false,
      message: "Server error.",
    });
  }
};

// @desc    Update conference (admin)
// @route   PUT /api/conference/:id
// @access  Private
const updateConference = async (req, res) => {
  try {
    const conference = await Conference.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!conference) {
      return res.status(404).json({
        success: false,
        message: "Conference not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Conference updated successfully.",
      conference,
    });
  } catch (error) {
    console.error("Update conference error:", error);
    res.status(500).json({
      success: false,
      message: "Server error.",
    });
  }
};

// @desc    Delete conference (admin)
// @route   DELETE /api/conference/:id
// @access  Private
const deleteConference = async (req, res) => {
  try {
    const conference = await Conference.findById(req.params.id);

    if (!conference) {
      return res.status(404).json({
        success: false,
        message: "Conference not found.",
      });
    }

    await conference.deleteOne();

    res.status(200).json({
      success: true,
      message: "Conference deleted successfully.",
    });
  } catch (error) {
    console.error("Delete conference error:", error);
    res.status(500).json({
      success: false,
      message: "Server error.",
    });
  }
};

module.exports = {
  getActiveConference,
  getAllConferences,
  createConference,
  updateConference,
  deleteConference,
};