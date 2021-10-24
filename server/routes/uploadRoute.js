const express = require("express");
const router = express.Router();
const {
  uploadImages,
  deleteCloudImage,
} = require("../controller/uploadController");

router.route("/").post(uploadImages);
router.route("/delete").post(deleteCloudImage);

module.exports = router;
