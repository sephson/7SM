const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const staffSchema = new mongoose.Schema(
  {
    staffName: {
      type: String,
      // required: true,
    },
    staffCompanyId: {
      type: Schema.Types.ObjectId,
      ref: "Company",
    },
    staffEmail: {
      type: String,
      // required: true,
    },
    staffPassword: {
      type: String,
      // required: true,
    },
    staffRank: {
      type: String,
      // required: true,
    },
    staffAge: {
      type: Number,
      // required: true,
    },
    staffPicture: {
      type: String,
    },
    staffDept: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    staffSalary: {
      type: Number,
    },
  },
  { timestamps: true }
);

const Staff = mongoose.model("Staff", staffSchema);

module.exports = Staff;
