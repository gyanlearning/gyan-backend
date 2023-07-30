

const { Timestamp } = require("bson");

const mongoose = require("mongoose");
const classSchema = new mongoose.Schema(
  {
    className: {
      type: String,
      required: true,
    },
    boardId: {
      type: mongoose.Schema.Types.ObjectId,

    },
    
    startTime:{
      type:String,
    },
    endTime:{
      type:String,

    },
    createdAt: { type: Date },
  },
  { timestamps: true }
);


module.exports =mongoose.model("Class", classSchema);

