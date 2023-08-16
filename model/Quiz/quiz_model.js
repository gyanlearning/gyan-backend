const mongoose = require("mongoose");
const quizSchema = new mongoose.Schema({
  classId: { type: mongoose.Schema.Types.ObjectId },
  subjectId: { type: mongoose.Schema.Types.ObjectId },
  chapterId: { type: mongoose.Schema.Types.ObjectId },
  questionId: { type: mongoose.Schema.Types.ObjectId },
  createdAt: { type: Date },
  updatedAt: { type: Date },
  createdBy: { type: Object },
  updatedBy: { type: Object },
});

module.exports = new mongoose.model("Quiz", quizSchema);
