const mongoose = require("mongoose");
const boardSchema = new mongoose.Schema(
  {
    boardName: { type: String, required: true },
    // schoolName:{type:String , required:true},
    state:{type:String , required:true},
    createdBy:{type:Object},
    updatedBy:{type:Object},
    createdAt:{type:Date},
    updatedAt:{type:Date},
  },
  { timestamps: true }
);
module.exports = mongoose.model("Board", boardSchema);
