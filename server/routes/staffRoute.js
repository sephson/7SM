const express = require("express");
const router = express.Router();
const staffController = require("../controller/staffController");

const { createStaff, companyStaff, staffDetails } = staffController;

router.route("/:companyId/add").post(createStaff);
router.route("/:companyId/all-staff").get(companyStaff);
router.route("/:staffId").get(staffDetails);

module.exports = router;
