const Setting = require("../models/Setting");

// ============================================================
// @desc    Get a setting by key (public)
// @route   GET /api/settings/:key
// @access  Public
// ============================================================
const getSettingByKey = async (req, res) => {
  try {
    const { key } = req.params;

    const setting = await Setting.findOne({ key });

    // Return empty value if key doesn't exist yet — no 404
    res.status(200).json({
      success: true,
      setting: setting || { key, value: "" },
    });
  } catch (error) {
    console.error("Get setting error:", error);
    res.status(500).json({
      success: false,
      message: "Server error.",
    });
  }
};

// ============================================================
// @desc    Get the free-book settings (public)
// @route   GET /api/settings/book
// @access  Public
// ============================================================
const getBookSettings = async (req, res) => {
  try {
    const [titleDoc, urlDoc] = await Promise.all([
      Setting.findOne({ key: "freeBookTitle" }),
      Setting.findOne({ key: "freeBookUrl" }),
    ]);

    res.status(200).json({
      success: true,
      settings: {
        title: titleDoc?.value || "",
        url: urlDoc?.value || "",
      },
    });
  } catch (error) {
    console.error("Get book settings error:", error);
    res.status(500).json({
      success: false,
      message: "Server error.",
    });
  }
};

// ============================================================
// @desc    Update the free-book settings (admin)
// @route   PUT /api/settings/book
// @access  Private (Admin)
// ============================================================
const updateBookSettings = async (req, res) => {
  try {
    const { title, url } = req.body;

    if (title !== undefined) {
      await Setting.findOneAndUpdate(
        { key: "freeBookTitle" },
        { key: "freeBookTitle", value: title },
        { upsert: true, new: true }
      );
    }

    if (url !== undefined) {
      await Setting.findOneAndUpdate(
        { key: "freeBookUrl" },
        { key: "freeBookUrl", value: url },
        { upsert: true, new: true }
      );
    }

    res.status(200).json({
      success: true,
      message: "Book settings updated successfully.",
    });
  } catch (error) {
    console.error("Update book settings error:", error);
    res.status(500).json({
      success: false,
      message: "Server error.",
    });
  }
};

// ============================================================
// @desc    Set any setting (admin — generic)
// @route   PUT /api/settings/:key
// @access  Private (Admin)
// ============================================================
const setSettingByKey = async (req, res) => {
  try {
    const { key } = req.params;
    const { value } = req.body;

    const setting = await Setting.findOneAndUpdate(
      { key },
      { key, value: value || "" },
      { upsert: true, new: true }
    );

    res.status(200).json({
      success: true,
      message: "Setting saved.",
      setting,
    });
  } catch (error) {
    console.error("Set setting error:", error);
    res.status(500).json({
      success: false,
      message: "Server error.",
    });
  }
};

module.exports = {
  getSettingByKey,
  getBookSettings,
  updateBookSettings,
  setSettingByKey,
};