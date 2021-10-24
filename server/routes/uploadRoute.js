const express = require("express");
const router = express.Router();
const { uploadImages } = require("../controller/uploadController");

router.route("/").post(uploadImages);

module.exports = router;
