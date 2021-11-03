const express = require("express");
const router = express.Router();
const familyController = require("../controller/familyController");

const {
  createFamilySpace,

  getUserFamilySpaces,
  familySpaceDetails,
} = familyController;

router.route("/create").post(createFamilySpace);

router.route("/:userId/familySpaces").get(getUserFamilySpaces);
router.route("/:familyId/familyDetails").get(familySpaceDetails);

module.exports = router;
