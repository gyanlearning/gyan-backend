const mongoose = require("mongoose");
const classBoardSubjectChapterQuestionSchema = new mongoose.Schema({
  questionId: { type: mongoose.Schema.Types.ObjectId, ref: "Question" },
  classBoardSubjectChapterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ChapterMapping",
  },
  createdBy: { type: mongoose.Schema.Types.ObjectId },
  updatedBy: { type: mongoose.Schema.Types.ObjectId },
  createdAt: { type: Date },
  updatedAt: { type: Date },
},{timestamps:true});
module.exports=new mongoose.model("ClassBoardSubjectChapterQuestion",classBoardSubjectChapterQuestionSchema);
