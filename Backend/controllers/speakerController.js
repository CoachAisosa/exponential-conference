const Speaker = require("../models/Speaker");

// @desc    Get all speakers (public)
// @route   GET /api/speakers
// @access  Public
const getSpeakers = async (req, res) => {
  try {
    const speakers = await Speaker.find({ published: true }).sort({
      order: 1,
      createdAt: 1,
    });

    res.status(200).json({
      success: true,
      count: speakers.length,
      speakers,
    });
  } catch (error) {
    console.error("Get speakers error:", error);
    res.status(500).json({
      success: false,
      message: "Server error.",
    });
  }
};

// @desc    Get single speaker
// @route   GET /api/speakers/:id
// @access  Public
const getSpeakerById = async (req, res) => {
  try {
    const speaker = await Speaker.findById(req.params.id);

    if (!speaker) {
      return res.status(404).json({
        success: false,
        message: "Speaker not found.",
      });
    }

    res.status(200).json({
      success: true,
      speaker,
    });
  } catch (error) {
    console.error("Get speaker error:", error);
    res.status(500).json({
      success: false,
      message: "Server error.",
    });
  }
};

// @desc    Create speaker (admin)
// @route   POST /api/speakers
// @access  Private
const createSpeaker = async (req, res) => {
  try {
    const speaker = await Speaker.create(req.body);

    res.status(201).json({
      success: true,
      message: "Speaker created successfully.",
      speaker,
    });
  } catch (error) {
    console.error("Create speaker error:", error);
    res.status(500).json({
      success: false,
      message: "Server error.",
    });
  }
};

// @desc    Update speaker (admin)
// @route   PUT /api/speakers/:id
// @access  Private
const updateSpeaker = async (req, res) => {
  try {
    const speaker = await Speaker.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!speaker) {
      return res.status(404).json({
        success: false,
        message: "Speaker not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Speaker updated successfully.",
      speaker,
    });
  } catch (error) {
    console.error("Update speaker error:", error);
    res.status(500).json({
      success: false,
      message: "Server error.",
    });
  }
};

// @desc    Delete speaker (admin)
// @route   DELETE /api/speakers/:id
// @access  Private
const deleteSpeaker = async (req, res) => {
  try {
    const speaker = await Speaker.findById(req.params.id);

    if (!speaker) {
      return res.status(404).json({
        success: false,
        message: "Speaker not found.",
      });
    }

    await speaker.deleteOne();

    res.status(200).json({
      success: true,
      message: "Speaker deleted successfully.",
    });
  } catch (error) {
    console.error("Delete speaker error:", error);
    res.status(500).json({
      success: false,
      message: "Server error.",
    });
  }
};

module.exports = {
  getSpeakers,
  getSpeakerById,
  createSpeaker,
  updateSpeaker,
  deleteSpeaker,
};