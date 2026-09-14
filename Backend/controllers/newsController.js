const News = require("../models/News");

// @desc    Get all news (public)
// @route   GET /api/news
// @access  Public
const getNews = async (req, res) => {
  try {
    const news = await News.find({ published: true }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: news.length,
      news,
    });
  } catch (error) {
    console.error("Get news error:", error);
    res.status(500).json({
      success: false,
      message: "Server error.",
    });
  }
};

// @desc    Get featured news
// @route   GET /api/news/featured
// @access  Public
const getFeaturedNews = async (req, res) => {
  try {
    const featured = await News.findOne({ featured: true, published: true });

    if (!featured) {
      return res.status(404).json({
        success: false,
        message: "No featured news found.",
      });
    }

    res.status(200).json({
      success: true,
      news: featured,
    });
  } catch (error) {
    console.error("Featured news error:", error);
    res.status(500).json({
      success: false,
      message: "Server error.",
    });
  }
};

// @desc    Get single news by ID
// @route   GET /api/news/:id
// @access  Public
const getNewsById = async (req, res) => {
  try {
    const news = await News.findById(req.params.id);

    if (!news) {
      return res.status(404).json({
        success: false,
        message: "News not found.",
      });
    }

    res.status(200).json({
      success: true,
      news,
    });
  } catch (error) {
    console.error("Get news by ID error:", error);
    res.status(500).json({
      success: false,
      message: "Server error.",
    });
  }
};

// @desc    Create news (admin)
// @route   POST /api/news
// @access  Private
const createNews = async (req, res) => {
  try {
    const news = await News.create(req.body);

    res.status(201).json({
      success: true,
      message: "News created successfully.",
      news,
    });
  } catch (error) {
    console.error("Create news error:", error);
    res.status(500).json({
      success: false,
      message: "Server error.",
    });
  }
};

// @desc    Update news (admin)
// @route   PUT /api/news/:id
// @access  Private
const updateNews = async (req, res) => {
  try {
    const news = await News.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!news) {
      return res.status(404).json({
        success: false,
        message: "News not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "News updated successfully.",
      news,
    });
  } catch (error) {
    console.error("Update news error:", error);
    res.status(500).json({
      success: false,
      message: "Server error.",
    });
  }
};

// @desc    Delete news (admin)
// @route   DELETE /api/news/:id
// @access  Private
const deleteNews = async (req, res) => {
  try {
    const news = await News.findById(req.params.id);

    if (!news) {
      return res.status(404).json({
        success: false,
        message: "News not found.",
      });
    }

    await news.deleteOne();

    res.status(200).json({
      success: true,
      message: "News deleted successfully.",
    });
  } catch (error) {
    console.error("Delete news error:", error);
    res.status(500).json({
      success: false,
      message: "Server error.",
    });
  }
};

module.exports = {
  getNews,
  getFeaturedNews,
  getNewsById,
  createNews,
  updateNews,
  deleteNews,
};