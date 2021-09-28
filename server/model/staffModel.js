const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const staffSchema = new mongoose.Schema(
  {
    staffName: {
      type: String,
      required: true,
    },
    staffCompanyId: {
      type: Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
    staffEmail: {
      type: String,
      required: true,
      unique: true,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please provide a valid email",
      ],
    },
    staffPassword: {
      type: String,
      required: true,
      select: true,
      minlength: 5,
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
    resetPasswordToekn: String,
    resetPasswordExpire: Date,
  },
  { timestamps: true }
);

staffSchema.pre("save", async function (next) {
  if (!this.isModified("staffPassword")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  //setting the staffpassword from the controller to its hashed version
  this.staffPassword = await bcrypt.hash(this.staffPassword, salt);
  next();
});

const Staff = mongoose.model("Staff", staffSchema);

module.exports = Staff;
