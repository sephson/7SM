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
    const user = await User.findOne({ displayName });
    const family = await Family.findOne({ _id: id });
    console.log();
    if (user && family) {
      if (!family.members.includes(user._id)) {
        await family.updateOne({
          $push: { members: user._id },
        });
        res.status(200).json({
          success: true,
          message: `successfully added ${user.displayName}`,
        });
      } else {
        res.status(403).json({
          sucess: false,
          message: `${user.displayName} is already in this family space`,
        });
      }
    } else {
      res.status(404).json({
        success: false,
        message: "user or family doesnt exist",
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
};

exports.getUserFamilySpaces = async (req, res) => {
  try {
    const family = await Family.find({}).populate("members");
    res.status(200).json(family.members);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.familySpaceDetails = async (req, res) => {
  const { familyId } = req.params;
  try {
    const family = await Family.findOne({ _id: familyId })
      .populate("members")
      .populate("createdBy");
    res.status(200).json(family);
  } catch (error) {
    res.status(500).json(error)
  }
};
