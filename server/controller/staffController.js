const Company = require("../model/companyModel");
const Staff = require("../Model/staffModel");

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
    res.status(201).json({ randomPassword: pass, data });
  } catch (error) {
    console.log(error);
  }
};

//get staff in a company
exports.companyStaff = async (req, res) => {
  const id = req.params.companyId;
  try {
    const getStaff = await Staff.find({ staffCompanyId: id });
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

//update admin status
exports.genPass = async (req, res) => {};
