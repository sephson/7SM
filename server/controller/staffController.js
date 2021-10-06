const Company = require("../model/companyModel");
const Staff = require("../model/staffModel");
const ErrorResponse = require("../utils/errorResponse");
const sendMail = require("../utils/sendEmail");
const crypto = require("crypto");

//create a staff
exports.createStaff = async (req, res) => {
  const {
    staffName,
    staffEmail,
    staffPassword,
    staffRank,
    staffAge,
    staffPicture,
    staffDept,
    isAdmin,
    staffSalary,
  } = req.body;

  const staffCompanyId = req.params.companyId;

  try {
    function genPass() {
      let password = "";
      const possible =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

      for (i = 0; i < 8; i++) {
        const random = Math.floor(Math.random() * possible.length);
        password += possible.charAt(random);
      }
      return password;
    }
    const checkEmail = await Staff.findOne({ staffEmail });
    if (!checkEmail) {
      const pass = genPass();
      const staff = await Staff.create({
        staffName,
        staffCompanyId,
        staffEmail,
        staffPassword: pass,
        staffRank,
        staffAge,
        staffPicture,
        staffDept,
        isAdmin,
        staffSalary,
      });
      console.log(pass);
      const data = await Staff.findOne({ _id: staff._id }).populate(
        "staffCompanyId"
      );
      sendTokenReg(data, 201, res, pass);
    } else {
      res
        .status(403)
        .json({ success: false, message: "This email already exist" });
    }
  } catch (error) {
    console.log(error);
  }
};

//get staff in a company
exports.companyStaff = async (req, res) => {
  const id = req.params.companyId;
  try {
    const getStaff = await Staff.find({ staffCompanyId: id }).populate(
      "staffCompanyId"
    );
    res.status(200).json(getStaff);
  } catch (error) {
    console.log(error);
  }
};

//get a particular staff
exports.staffDetails = async (req, res) => {
  const id = req.params.staffId;
  try {
    const staff = await Staff.find({ _id: id }).populate("staffCompanyId");
    res.status(200).json(staff);
  } catch (error) {
    console.log(error);
  }
};

//create admin endpoint
exports.createAdmin = async (req, res) => {
  const staffCompanyId = req.params.companyId;
  const { staffName } = req.body;
  try {
    const getStaff = await Staff.find({ staffCompanyId });
    const admins = getStaff.filter((staff) => staff.isAdmin === true);
    if (admins.length >= 2) {
      res.status(403).json("You can only have two admins in an organisation");
    } else {
      const adminCreated = await Staff.create({
        staffName,
        staffCompanyId,
        isAdmin: true,
      });
      const data = await Staff.findOne({ _id: adminCreated._id }).populate(
        "staffCompanyId"
      );
      res.status(200).json({ status: "Admin successfully created", data });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.staffLogin = async (req, res) => {
  const staffCompanyId = req.params.companyId;
  const { staffEmail, staffPassword } = req.body;
  if (!staffEmail || !staffPassword)
    return new ErrorResponse("Input email or password", 400);
  try {
    const staff = await Staff.findOne({ staffCompanyId, staffEmail }).select(
      "+staffPassword"
    );
    if (!staff)
      res.status(404).json({ success: false, message: "Staff not found" });

    const isMatch = await staff.matchPasswords(staffPassword);
    isMatch
      ? sendToken(staff, 201, res)
      : res.status(404).json({ success: false, message: "Staff not found" });
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.forgotPassword = async (req, res, next) => {};

exports.resetPassword = async (req, res) => {
  const staffCompanyId = req.params.companyId;
  const { staffPassword, staffEmail, newPassword } = req.body;

  if (!staffPassword || !newPassword || !staffEmail) {
    res.status(403).json({
      success: false,
      message: "Input correct previous pass and enter new password",
    });
  }

  try {
    const staff = await Staff.findOne({ staffCompanyId, staffEmail }).select(
      "+staffPassword"
    );
    if (!staff)
      res.status(404).json({ success: false, message: "Staff not found" });

    const isMatch = await staff.matchPasswords(staffPassword);

    if (isMatch) {
      staff.staffPassword = newPassword;
      console.log(staff.staffPassword);
      console.log(staffPassword);
      await staff.save();

      res.status(200).json({ success: true, message: "password updated" });
    } else {
      res.status(400).json({ success: false, message: "something went wrong" });
    }
  } catch (error) {
    if (error.name === "CastError")
      res
        .status(500)
        .json({ error: error.message.slice(0, 23), check: error.path });
    else res.status(500).json(error);
  }
};

//make existing staff admin
exports.updateStaffToAdmin = async (req, res) => {
  const staffCompanyId = req.params.companyId;
  const { staffEmail } = req.body;
  try {
    const allStaff = await Staff.find({ staffCompanyId });
    const admins = allStaff.filter((staff) => staff.isAdmin === true);
    const staff = await Staff.findOne({ staffCompanyId, staffEmail });
    if (staff.isAdmin === false && admins.length < 3) {
      await staff.updateOne({ $set: { isAdmin: true } });
      res
        .status(200)
        .json({ success: true, message: `${staff.staffName} is now an Admin` });
    } else {
      res
        .status(403)
        .json({ success: false, message: "sorry cant make you an admin" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.removeAdmin = async (req, res) => {
  const staffCompanyId = req.params.companyId;
  const { staffEmail } = req.body;
}

const sendToken = (staff, statusCode, res) => {
  const token = staff.getSignedToken();
  res.status(statusCode).json({ success: true, staff, token });
};

const sendTokenReg = (staff, statusCode, res, random) => {
  const token = staff.getSignedToken();
  res.status(statusCode).json({ success: true, token, random });
};
