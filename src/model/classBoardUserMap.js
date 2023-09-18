const mongoose = require("mongoose");
const classBoardMapSchema = new mongoose.Schema(
  {
    userId: {
         type: mongoose.Schema.Types.ObjectId,
         
          ref: "User" },
    classBoardMapId: { 
        type: mongoose.Schema.Types.ObjectId,
        ref:"ClassBoardMap"
     },
    createdAt: { type: Date },
    updatedAt: { type: Date },
    createdBy: { type: Object,ref:"User" },
    updatedBy: { type: Object,ref:"User" },
  },
  { timestamps: true }
);
module.exports = mongoose.model("ClassBoardUserMap", classBoardMapSchema);
