const mongoose = require("mongoose");
const quizSchema = new mongoose.Schema(
  {
    classId: { type: mongoose.Schema.Types.ObjectId },
    subjectId: { type: mongoose.Schema.Types.ObjectId },
    quizData: [
      {
        question: { type: String },
        option1: { type: String },
        option2: { type: String },
        option3: { type: String },
        option4: { type: String },
        answer: { type: String },
      },
    ],
    message: { type: String },
    createdBy: { type: Object },
    updatedBy: { type: Object },
    createdBy: { type: Object }, 
    updatedBy: { type: Object },
  },
  { timestamps: true }
);
module.exports = mongoose.model("quizdata", quizSchema);
