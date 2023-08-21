const { ObjectId } = require("bson");
const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    mobile: { type: String, required: true },
    password: { type: String, required: true },
    latLong:{type:ObjectId},
    token:{type:ObjectId},
    createdAt:{type:Date},
    updatedAt:{type:Date},
    createdBy:{type:Object,ref:"User"},
    updatedBy:{type:Object,ref:"User"}
  },

  { timestamps: true }
);
module.exports = mongoose.model("User", userSchema);
