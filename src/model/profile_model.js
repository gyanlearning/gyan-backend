const mongoose = require("mongoose");
const profileSchema = mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId },
    // address: [
    //   {
    //     village: {
    //       type: String,
    //     },
    //     district: {
    //       type: String,
    //     },
    //     pincode: {
    //       type: Number,
    //     },
    //     state: {
    //       type: String,
    //     },
    //     //country: {"India"},
    //   },
    // ],
    email: { type: String },
    avtar: { type: String },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    createdBy: { type: Object, ref: "User" },
    updatedBy: { type: Object, ref: "User" },
    createdAt: { type: Date },
    updatedAt: { type: Date },
  },

  { timestamps: true }
);
module.exports = mongoose.model("Profiles", profileSchema);
