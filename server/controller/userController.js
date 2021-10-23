const User = require("../model/userModel");
const ErrorResponse = require("../utils/errorResponse");
const sendMail = require("../utils/sendEmail");
const crypto = require("crypto");

exports.register = async (req, res) => {
  const { name, displayName, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      res
        .status(403)
        .json({ success: false, message: "input password, name or email" });
    }

    if (!displayName) {
      const user = await User.create({
        name,
        displayName: `@${name.split(" ").join("")}`,
        email,
        password,
      });
      sendToken(user, 200, res);
    } else {
      if (/\s/g.test(displayName)) {
        res.status(403).json({
          success: false,
          message: "your displayName cannot have space",
        });
      } else {
        const user = await User.create({
          name,
          displayName: `@${displayName}`,
          email,
          password,
        });
        sendToken(user, 200, res);
      }
    }
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return new ErrorResponse("Input email or password", 400);
  try {
    const user = await User.findOne({ email }).select("+staffPassword");
    if (!user)
      res.status(404).json({ success: false, message: "user not found" });

    const isMatch = await user.matchPasswords(password);
    isMatch
      ? sendToken(user, 201, res)
      : res.status(404).json({ success: false, message: "user not found" });
  } catch (error) {
    res.status(500).json(error);
  }
};

const sendToken = (user, statusCode, res) => {
  const token = user.getSignedToken();
  res.status(statusCode).json({ success: true, user, token });
};
