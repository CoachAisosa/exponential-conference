const Training = require("../models/Training");

// ============================================================
// @desc    Get all published trainings (public)
// @route   GET /api/trainings
// @access  Public
// ============================================================
const getPublicTrainings = async (req, res) => {
  try {
    const trainings = await Training.find({ published: true }).sort({
      order: 1,
      scheduledAt: 1,
      createdAt: 1,
    });

    res.status(200).json({
      success: true,
      count: trainings.length,
      trainings,
    });
  } catch (error) {
    console.error("Get public trainings error:", error);
    res.status(500).json({
      success: false,
      message: "Server error.",
    });
  }
};

// ============================================================
// @desc    Get all trainings including unpublished (admin)
// @route   GET /api/trainings/all
// @access  Private (Admin)
// ============================================================
const getAllTrainings = async (req, res) => {
  try {
    const trainings = await Training.find().sort({
      order: 1,
      scheduledAt: 1,
      createdAt: 1,
    });

    res.status(200).json({
      success: true,
      count: trainings.length,
      trainings,
    });
  } catch (error) {
    console.error("Get all trainings error:", error);
    res.status(500).json({
      success: false,
      message: "Server error.",
    });
  }
};

// ============================================================
// @desc    Create training (admin)
// @route   POST /api/trainings
// @access  Private (Admin)
// ============================================================
const createTraining = async (req, res) => {
  try {
    const {
      title,
      description,
      youtubeId,
      scheduledAt,
      order,
      published,
    } = req.body;

    if (!title || !youtubeId) {
      return res.status(400).json({
        success: false,
        message: "Title and YouTube ID are required.",
      });
    }

    const training = await Training.create({
      title,
      description: description || "",
      youtubeId,
      scheduledAt: scheduledAt || null,
      order: order || 0,
      published: published !== false,
      status: "upcoming",
    });

    res.status(201).json({
      success: true,
      message: "Training created successfully.",
      training,
    });
  } catch (error) {
    console.error("Create training error:", error);
    res.status(500).json({
      success: false,
      message: "Server error.",
    });
  }
};

// ============================================================
// @desc    Update training (admin)
// @route   PUT /api/trainings/:id
// @access  Private (Admin)
// ============================================================
const updateTraining = async (req, res) => {
  try {
    const training = await Training.findById(req.params.id);

    if (!training) {
      return res.status(404).json({
        success: false,
        message: "Training not found.",
      });
    }

    const {
      title,
      description,
      youtubeId,
      scheduledAt,
      order,
      published,
      status,
    } = req.body;

    if (title !== undefined) training.title = title;
    if (description !== undefined) training.description = description;
    if (youtubeId !== undefined) training.youtubeId = youtubeId;
    if (scheduledAt !== undefined) training.scheduledAt = scheduledAt;
    if (order !== undefined) training.order = order;
    if (published !== undefined) training.published = published;
    if (status !== undefined) training.status = status;

    await training.save();

    res.status(200).json({
      success: true,
      message: "Training updated successfully.",
      training,
    });
  } catch (error) {
    console.error("Update training error:", error);
    res.status(500).json({
      success: false,
      message: "Server error.",
    });
  }
};

// ============================================================
// @desc    Delete training (admin)
// @route   DELETE /api/trainings/:id
// @access  Private (Admin)
// ============================================================
const deleteTraining = async (req, res) => {
  try {
    const training = await Training.findById(req.params.id);

    if (!training) {
      return res.status(404).json({
        success: false,
        message: "Training not found.",
      });
    }

    await training.deleteOne();

    res.status(200).json({
      success: true,
      message: "Training deleted successfully.",
    });
  } catch (error) {
    console.error("Delete training error:", error);
    res.status(500).json({
      success: false,
      message: "Server error.",
    });
  }
};

// ============================================================
// @desc    Set a training as LIVE (and move others to upcoming/completed)
// @route   POST /api/trainings/:id/activate
// @access  Private (Admin)
// ============================================================
const activateTraining = async (req, res) => {
  try {
    const target = await Training.findById(req.params.id);

    if (!target) {
      return res.status(404).json({
        success: false,
        message: "Training not found.",
      });
    }

    // 1. Any training currently "live" (except target) becomes "completed"
    await Training.updateMany(
      { _id: { $ne: target._id }, status: "live" },
      { $set: { status: "completed" } }
    );

    // 2. Set target to live
    target.status = "live";
    await target.save();

    res.status(200).json({
      success: true,
      message: `"${target.title}" is now the LIVE training.`,
      training: target,
    });
  } catch (error) {
    console.error("Activate training error:", error);
    res.status(500).json({
      success: false,
      message: "Server error.",
    });
  }
};

module.exports = {
  getPublicTrainings,
  getAllTrainings,
  createTraining,
  updateTraining,
  deleteTraining,
  activateTraining,
};