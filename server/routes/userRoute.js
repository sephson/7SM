const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");

const { login, register, userDetails } = userController

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/:displayName").get(userDetails)

module.exports = router;
