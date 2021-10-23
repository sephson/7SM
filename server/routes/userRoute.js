const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");

const { login, register } = userController

router.route("/register").post(register);
router.route("/login").post(login);

module.exports = router;
