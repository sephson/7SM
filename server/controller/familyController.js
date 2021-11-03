const Family = require("../model/familySpaceModel");
const Request = require("../model/requestModel");
const Room = require("../model/roomModel");
const User = require("../model/userModel");
const ErrorResponse = require("../utils/errorResponse");

exports.createFamilySpace = async (req, res) => {
  const { familyName, createdBy } = req.body;
  try {
    const checkId = await User.findOne({ _id: createdBy });
    if (!checkId) {
      res.status(401).json({ success: false, message: "user doesnt exist" });
    } else {
      const family = await Family.create({
        familyName,
        createdBy,
      });
      await family.updateOne({ $push: { members: createdBy } });
      const createdFamily = await Family.find({ _id: family._id })
        .populate("createdBy")
        .populate("members");
      const newRoom = await Room.create({
        familySpace: family._id,
        members: createdBy,
      });
      res.status(201).json({ success: true, createdFamily, newRoom });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getUserFamilySpaces = async (req, res) => {
  const { userId } = req.params;
  try {
    const family = await Family.find({});
    const familySpaces = family.filter((fam) => fam.members.includes(userId));

    familySpaces.length === 0
      ? res.status(200).json("user is not in any family space")
      : res.status(200).json(familySpaces);
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
    res
      .status(200)
      .json({ success: true, familySpaceCount: family.members.length, family });
  } catch (error) {
    res.status(500).json(error);
  }
};
