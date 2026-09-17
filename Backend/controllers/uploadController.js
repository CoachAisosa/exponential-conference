const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No image uploaded.",
      });
    }

    // Cloudinary returns the URL in req.file.path
    res.status(200).json({
      success: true,
      message: "Image uploaded successfully.",
      url: req.file.path,
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({
      success: false,
      message: "Upload failed.",
    });
  }
};

module.exports = { uploadImage };