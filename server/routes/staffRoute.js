const express = require("express");
const router = express.Router();
const staffController = require("../controller/staffController");

const {
  createStaff,
  companyStaff,
  staffDetails,
  createAdmin,
  staffLogin,
  forgotPassword,
  resetPassword,
} = staffController;

router.route("/:companyId/add").post(createStaff);
router.route("/:companyId/all-staff").get(companyStaff);
router.route("/:staffId").get(staffDetails);
router.route("/:companyId/createAdmin").post(createAdmin);
router.route("/:companyId/staffLogin").post(staffLogin);
router.route("/forgotPassword").post(forgotPassword);
router.route("/:companyId/resetPassword").put(resetPassword);
module.exports = router;
