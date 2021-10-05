const express = require("express");
const router = express.Router();
const protected = require("../controller/protected");
const { protects } = require("../middleware/auth");
const { getProtectedData } = protected;

router.route("/").get(protects, getProtectedData);

module.exports = router;
