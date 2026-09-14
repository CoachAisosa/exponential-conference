const NewsInteraction = require("../models/newsInteraction");
const News = require("../models/News");

// Helper: Validate MongoDB ObjectId
const isValidObjectId = (id) => {
  return id && id.match(/^[0-9a-fA-F]{24}$/);
};

// ============================================================
// @desc    Get interaction for a specific news
// @route   GET /api/news-interactions/:newsId
// @access  Public
// ============================================================
const getInteractions = async (req, res) => {
  try {
    const { newsId } = req.params;

    if (!isValidObjectId(newsId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid news ID format.",
      });
    }

    let interaction = await NewsInteraction.findOne({ newsId });

    if (!interaction) {
      interaction = await NewsInteraction.create({
        newsId,
        likes: [],
        comments: [],
        shares: 0,
      });
    }

    res.status(200).json({
      success: true,
      interaction: {
        newsId: interaction.newsId,
        likeCount: interaction.likes.length,
        commentCount: interaction.comments.length,
        shareCount: interaction.shares,
        comments: interaction.comments,
      },
    });
  } catch (error) {
    console.error("Get interactions error:", error);
    res.status(500).json({
      success: false,
      message: "Server error.",
    });
  }
};

// ============================================================
// @desc    Toggle like on a news
// @route   POST /api/news-interactions/:newsId/like
// @access  Public
// ============================================================
const toggleLike = async (req, res) => {
  try {
    const { newsId } = req.params;
    const { visitorId } = req.body || {};

    // Validate newsId
    if (!isValidObjectId(newsId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid news ID format.",
      });
    }

    // Validate visitorId
    if (!visitorId) {
      return res.status(400).json({
        success: false,
        message: "Visitor ID is required.",
      });
    }

    // Verify news exists
    const news = await News.findById(newsId);
    if (!news) {
      return res.status(404).json({
        success: false,
        message: "News not found.",
      });
    }

    let interaction = await NewsInteraction.findOne({ newsId });

    if (!interaction) {
      interaction = await NewsInteraction.create({
        newsId,
        likes: [],
        comments: [],
      });
    }

    const existingLikeIndex = interaction.likes.findIndex(
      (like) => like.visitorId === visitorId
    );

    let action;
    if (existingLikeIndex > -1) {
      interaction.likes.splice(existingLikeIndex, 1);
      action = "unliked";
    } else {
      interaction.likes.push({ visitorId });
      action = "liked";
    }

    await interaction.save();

    res.status(200).json({
      success: true,
      action,
      likeCount: interaction.likes.length,
    });
  } catch (error) {
    console.error("Toggle like error:", error);
    res.status(500).json({
      success: false,
      message: "Server error.",
    });
  }
};

// ============================================================
// @desc    Add comment to a news
// @route   POST /api/news-interactions/:newsId/comment
// @access  Public
// ============================================================
const addComment = async (req, res) => {
  try {
    const { newsId } = req.params;
    const { name, email, text } = req.body || {};

    if (!isValidObjectId(newsId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid news ID format.",
      });
    }

    if (!name || !text) {
      return res.status(400).json({
        success: false,
        message: "Name and comment text are required.",
      });
    }

    const news = await News.findById(newsId);
    if (!news) {
      return res.status(404).json({
        success: false,
        message: "News not found.",
      });
    }

    let interaction = await NewsInteraction.findOne({ newsId });

    if (!interaction) {
      interaction = await NewsInteraction.create({
        newsId,
        likes: [],
        comments: [],
      });
    }

    interaction.comments.push({ name, email: email || "", text });
    await interaction.save();

    res.status(201).json({
      success: true,
      message: "Comment added.",
      comment: interaction.comments[interaction.comments.length - 1],
      commentCount: interaction.comments.length,
    });
  } catch (error) {
    console.error("Add comment error:", error);
    res.status(500).json({
      success: false,
      message: "Server error.",
    });
  }
};

// ============================================================
// @desc    Increment share count
// @route   POST /api/news-interactions/:newsId/share
// @access  Public
// ============================================================
const incrementShare = async (req, res) => {
  try {
    const { newsId } = req.params;

    if (!isValidObjectId(newsId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid news ID format.",
      });
    }

    let interaction = await NewsInteraction.findOne({ newsId });

    if (!interaction) {
      interaction = await NewsInteraction.create({
        newsId,
        likes: [],
        comments: [],
        shares: 1,
      });
    } else {
      interaction.shares += 1;
      await interaction.save();
    }

    res.status(200).json({
      success: true,
      shareCount: interaction.shares,
    });
  } catch (error) {
    console.error("Increment share error:", error);
    res.status(500).json({
      success: false,
      message: "Server error.",
    });
  }
};

// ============================================================
// @desc    Delete a comment (admin)
// @route   DELETE /api/news-interactions/:newsId/comment/:commentId
// @access  Private
// ============================================================
const deleteComment = async (req, res) => {
  try {
    const { newsId, commentId } = req.params;

    if (!isValidObjectId(newsId) || !isValidObjectId(commentId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid ID format.",
      });
    }

    const interaction = await NewsInteraction.findOne({ newsId });

    if (!interaction) {
      return res.status(404).json({
        success: false,
        message: "Interaction not found.",
      });
    }

    interaction.comments = interaction.comments.filter(
      (c) => c._id.toString() !== commentId
    );

    await interaction.save();

    res.status(200).json({
      success: true,
      message: "Comment deleted.",
    });
  } catch (error) {
    console.error("Delete comment error:", error);
    res.status(500).json({
      success: false,
      message: "Server error.",
    });
  }
};

module.exports = {
  getInteractions,
  toggleLike,
  addComment,
  incrementShare,
  deleteComment,
};