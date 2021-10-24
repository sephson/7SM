const upload = require("../utils/cloudinary");
const Family = require("../model/familySpaceModel");
const User = require("../model/userModel");
const ErrorResponse = require("../utils/errorResponse");

exports.uploadImages = async (req, res) => {
  const { image } = req.files;
  console.log(image);
  try {
    const result = await upload(image.tempFilePath);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};
