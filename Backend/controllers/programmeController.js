const Programme = require("../models/Programme");

// @desc    Get all programme days
// @route   GET /api/programme
// @access  Public
const getProgrammes = async (req, res) => {
  try {
    const programmes = await Programme.find().sort({ day: 1 });

    res.status(200).json({
      success: true,
      count: programmes.length,
      programmes,
    });
  } catch (error) {
    console.error("Get programmes error:", error);
    res.status(500).json({
      success: false,
      message: "Server error.",
    });
  }
};

// @desc    Create programme day (admin)
// @route   POST /api/programme
// @access  Private
const createProgramme = async (req, res) => {
  try {
    const programme = await Programme.create(req.body);

    res.status(201).json({
      success: true,
      message: "Programme created successfully.",
      programme,
    });
  } catch (error) {
    console.error("Create programme error:", error);
    res.status(500).json({
      success: false,
      message: "Server error.",
    });
  }
};

// @desc    Update programme (admin)
// @route   PUT /api/programme/:id
// @access  Private
const updateProgramme = async (req, res) => {
  try {
    const programme = await Programme.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!programme) {
      return res.status(404).json({
        success: false,
        message: "Programme not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Programme updated successfully.",
      programme,
    });
  } catch (error) {
    console.error("Update programme error:", error);
    res.status(500).json({
      success: false,
      message: "Server error.",
    });
  }
};

// @desc    Delete programme (admin)
// @route   DELETE /api/programme/:id
// @access  Private
const deleteProgramme = async (req, res) => {
  try {
    const programme = await Programme.findById(req.params.id);

    if (!programme) {
      return res.status(404).json({
        success: false,
        message: "Programme not found.",
      });
    }

    await programme.deleteOne();

    res.status(200).json({
      success: true,
      message: "Programme deleted successfully.",
    });
  } catch (error) {
    console.error("Delete programme error:", error);
    res.status(500).json({
      success: false,
      message: "Server error.",
    });
  }
};

module.exports = {
  getProgrammes,
  createProgramme,
  updateProgramme,
  deleteProgramme,
};