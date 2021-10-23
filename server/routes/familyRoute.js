const express = require("express");
const router = express.Router();
const familyController = require("../controller/familyController");

const { createFamilySpace, addUserToFamilySpace } = familyController;

router.route("/create").post(createFamilySpace);
router.route("/:familyId/addToFamilySpace").put(addUserToFamilySpace);

module.exports = router;
