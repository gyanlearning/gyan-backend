const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    mobile: { type: String, required: true },
    otp: { type: String, required: true },
    otpExpiresAt: { type: Date, required: true },
    createdBy:{type:Object},
    updatedBy:{type:Object}
  },

  { timestamps: true }
);
module.exports = mongoose.model("User", userSchema);
