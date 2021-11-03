const Family = require("../model/familySpaceModel");
const FamilyRequest = require("../model/requestModel");
const User = require("../model/userModel");
const ErrorResponse = require("../utils/errorResponse");

exports.sendInviteToJoinFamilySpace = async (req, res) => {
  const { receiver, sender } = req.body;
  const { familyId } = req.params;
  try {
    const family = await Family.findOne({ _id: familyId, members: receiver });
    const familySpaceReq = await FamilyRequest.findOne({
      requestStatus: "pending",
      requestReceiver: receiver,
      requestSender: sender,
      familySpace: familyId,
    });
    const findUser = await User.findOne({ _id: receiver });
    if (findUser && !family && !familySpaceReq) {
      console.log(familySpaceReq);
      const invite = await FamilyRequest.create({
        requestReceiver: receiver,
        requestSender: sender,
        familySpace: familyId,
      });
      res
        .status(201)
        .json({ success: true, message: "invite successfully sent", invite });
    } else {
      res.status(403).json({
        success: false,
        message:
          "invite failed, either this user doesnt exist, an invitation request is already sent or the user doesnt exist",
      });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.invites = async (req, res) => {
  const { userId } = req.params;
  const allMyInvites = await FamilyRequest.find({ requestReceiver: userId })
    .populate("requestSender")
    .populate("familySpace");
  res
    .status(200)
    .json({ success: true, total: allMyInvites.length, allMyInvites });
};

exports.acceptInvite = async (req, res) => {
  const { familyId } = req.params;
  const { userId } = req.body;
  try {
    const findInvite = await FamilyRequest.findOne({
      requestReceiver: userId,
      familySpace: familyId,
      requestStatus: "pending",
    });
    await findInvite.updateOne({ $set: { requestStatus: "accepted" } });
    await Family.findOneAndUpdate(
      { _id: familyId },
      { $push: { members: userId } }
    );
    const updatedFam = await Family.findById(familyId).populate("members");
    res.status(200).json({ success: true, updatedFam });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
};
