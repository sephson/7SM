const jwt = require("jsonwebtoken");
const Staff = require("../model/staffModel");
const Company = require("../model/companyModel.js");
const ErrorResponse = require("../utils/errorResponse");

exports.protects = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];

    if (!token)
      return next(
        new ErrorResponse("Not Authorized to access this route", 401)
      );

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const staff = await Staff.findById(decoded.id);
      if (!staff) return next(new ErrorResponse("No staff found", 404));
      req.staff = staff;
      next();
    } catch (error) {
      return next(new ErrorResponse("Not authorised", 401));
    }
  }
};
