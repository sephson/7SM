const express = require("express");
const router = express.Router();
const requestController = require("../controller/requestController");

const {
  sendInviteToJoinFamilySpace,
  invites,
  acceptInvite,
  viewAllSentInvite,
} = requestController;

router.route("/:familyId/sendInvite").post(sendInviteToJoinFamilySpace);
router.route("/:userId/invites").get(invites);
router.route("/:familyId/acceptInvite").put(acceptInvite);
router.route("/:userId/viewAllSentInvite").get(viewAllSentInvite);

module.exports = router;
