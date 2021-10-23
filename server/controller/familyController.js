const Family = require("../model/familySpaceModel");
const User = require("../model/userModel");
const ErrorResponse = require("../utils/errorResponse");

exports.createFamilySpace = async (req, res) => {
  const { familyName, createdBy } = req.body;
  try {
    const checkId = await User.findOneAndUpdate(
      { _id: createdBy },
      { $set: { isAdmin: true } }
    );
    if (!checkId) {
      res.status(401).json({ success: false, message: "user doesnt exist" });
    } else {
      const family = await Family.create({
        familyName,
        createdBy,
      });
      await family.updateOne({ $push: { members: createdBy } });
      const findFam = await Family.find({ _id: family._id })
        .populate("createdBy")
        .populate("members");
      res.status(201).json({ success: true, findFam });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.addUserToFamilySpace = async (req, res) => {
  const { displayName } = req.body;
  const id = req.params.familyId;
  try {
    const user = await User.find({ displayName });
    if (user) {
      await Family.updateOne({
        $push: { members: user._id },
      });
      const family = await Family.find({ _id: id }).populate(members);
      res.status(201).json({ success: true, family });
    } else {
      res.status(404).json({ success: false, message: "user doesnt exist" });
    }
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
};
