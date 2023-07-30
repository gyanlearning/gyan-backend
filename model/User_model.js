const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    mobile: { type: String, required: true },
    otp: { type: String, required: true },

    profile_id: { type: mongoose.Schema.Types.ObjectId },
    createdAt: Date,

    otpExpiresAt: { type: Date, required: true },
  },

  { timestamps: true }
);
module.exports = mongoose.model("User", userSchema);
