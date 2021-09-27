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
    const staff = await Staff.create({
      staffName,
      staffCompanyId,
      staffEmail,
      staffPassword,
      staffRank,
      staffAge,
      staffPicture,
      staffDept,
      isAdmin,
      staffSalary,
    });
    const data = await Staff.findOne({ _id: staff._id }).populate(
      "staffCompanyId"
    );
    res.status(201).json(data);
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
