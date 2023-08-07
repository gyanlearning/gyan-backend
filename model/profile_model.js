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
    avtar: { type: String },
    userId: { type: mongoose.Schema.Types.ObjectId },
    createdBy: { type: Object },
    updatedBy: { type: Object },
  },

  { timestamps: true }
);
module.exports = mongoose.model("Profiles", profileSchema);
