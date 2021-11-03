const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RequestSchema = new mongoose.Schema(
  {
    requestSender: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    requestReceiver: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    familySpace: {
      type: Schema.Types.ObjectId,
      ref: "Family",
    },
    requestStatus: {
      type: String,
      default: "pending",
      required: true,
    },
  },
  { timestamps: true }
);

const Request = mongoose.model("Request", RequestSchema);

module.exports = Request;
