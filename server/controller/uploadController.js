const { cloudinaryUpload, cloudinaryDelete } = require("../utils/cloudinary");

exports.uploadImages = async (req, res) => {
  const { image } = req.files;
  try {
    const result = await cloudinaryUpload(image.tempFilePath);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.deleteCloudImage = async (req, res) => {
  const { public_id } = req.body;
  try {
    const result = await cloudinaryDelete(public_id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};
