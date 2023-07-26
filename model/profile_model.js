
const mongoose = require("mongoose");

const profileSchema = mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    address: [
      {
        village: {
          type: String,
        },
        district: {
          type: String,
        },

        pincode: {
          type: Number,
        },
        state: {
          type: String,
        },
        //country: {"India"},
      },
    ],
    profileAvatar: { type: String },
    createdAt: Date,
  },

  { timestamps: true }
);
module.exports = mongoose.model("Profiles", profileSchema);
