const mongoose = require("mongoose");
const boardSchema = new mongoose.Schema(
  {
    boardName: { type: String, required: true },
    schoolName:{type:String , required:true},
    createdBy:{type:Object},
    updatedBy:{type:Object}
  },
  { timestamps: true }
);
module.exports = mongoose.model("Board", boardSchema);
