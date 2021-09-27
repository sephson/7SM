const Company = require("../model/companyModel");

exports.createCompany = async (req, res) => {
  const { companyName, companyInfo } = req.body;
  try {
    const company = await Company.create({
      companyName,
      companyInfo,
    });
    res
      .status(201)
      .json({ status: "successfully created a company", data: company });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
