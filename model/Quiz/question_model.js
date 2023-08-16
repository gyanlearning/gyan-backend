const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    title: { type: String },
    option: [
      {
        otpion1: {
          type: String,
        },
        option2: {
          type: String,
        },
        option3: {
          type: String,
        },
        option4: {
          type: String,
        },
      },
    ],
    class:{type:Number},
    subject:{type:String},
    answer:{type:String},
    marks: { type: Number },
    createdAt: { type: Date },
    updatedAt: { type: Date },
    createdBy: { type: Object },
    updatedBy: { type: Object },
  },
  { timestamps: true }
);

module.exports = new mongoose.model("Question", questionSchema);
