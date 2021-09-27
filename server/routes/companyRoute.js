const express = require("express");
const router = express.Router();
const companyController = require("../controller/companyController");

const { createCompany } = companyController;

router.route("/create").post(createCompany);

module.exports = router;
