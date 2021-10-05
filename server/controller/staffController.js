const Company = require("../model/companyModel");
const Staff = require("../model/staffModel");
const ErrorResponse = require("../utils/errorResponse");

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
    // res.status(201).json({ randomPassword: pass, data });
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

exports.forgotPassword = async (req, res, next) => {
  const { staffEmail } = req.body;

  try {
    const staff = await Staff.findOne({ staffEmail });
    if (!staff) return next(new ErrorResponse("Email not sent", 404));

    const resetToken = staff.getResetPasswordToken();
    await staff.save();

    const resetUrl = `http://localhost:3000/passwordreset/${resetToken}`;

    const message = `
    <h1>You have requested for a password reset </h1>
    <p>Please go to this link to reset your password </p>
    <a href= ${resetUrl} clicktracking=off>${resetUrl}</a>
    `;

    try {
    } catch (error) {}
  } catch (error) {}
};

const sendToken = (staff, statusCode, res) => {
  const token = staff.getSignedToken();
  res.status(statusCode).json({ success: true, token });
};

const sendTokenReg = (staff, statusCode, res, random) => {
  const token = staff.getSignedToken();
  res.status(statusCode).json({ success: true, token, random });
};
