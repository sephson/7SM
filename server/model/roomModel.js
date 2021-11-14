const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RoomSchema = new mongoose.Schema(
  {
    roomName: {
      type: String,
      default: "family-room"
    },
    members: [{ type: Schema.Types.ObjectId, ref: "User" }],
    familySpace: {
      type: Schema.Types.ObjectId,
      ref: "Family",
    },
    roomType: {
      type: String,
      default: "public"
    },
    defaultRoom: {
      type: String,
      default: "yes",
    },
    roomCreator: {
      type: String,
      default: "general",
    },
  },
  { timestamps: true }
);

const Room = mongoose.model("Room", RoomSchema);

module.exports = Room;
