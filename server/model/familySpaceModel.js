const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const familySpaceSchema = new mongoose.Schema(
  {
    familyName: {
      type: String,
      required: true,
      minLength: 3,
    },
    familyPicture: {
      type: String,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    members: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

const Family = mongoose.model("Family", familySpaceSchema);

module.exports = Family;
