const express = require("express");
const router = express.Router();
const familyController = require("../controller/familyController");

const { createFamilySpace } = familyController;

router.route("/create").post(createFamilySpace);

module.exports = router;
