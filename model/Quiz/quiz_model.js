const mongoose = require("mongoose");
const quizSchema = new mongoose.Schema({
  name: { type:String,unique:true},
  startTime:{type:Date},
  endTime:{type:Date},
  duration:{type:String},
  attempDuration:{type:String},
  isActive:{type:Boolean},
  questions:[
    {
      questionId:{type:mongoose.Schema.Types.ObjectId,ref:"Question"}
    }
  ],
  classBoardId: { type: mongoose.Schema.Types.ObjectId ,ref:"ClassBoardMap"},
  classBoardSubjectChapterId: { type: mongoose.Schema.Types.ObjectId,ref:"ChapterMapping" },
  classBoardSubjectId: { type: mongoose.Schema.Types.ObjectId,ref:"ClassBoardSubjectSchema" },
  createdAt: { type: Date },
  updatedAt: { type: Date },
  createdBy: { type: Object },
  updatedBy: { type: Object },
});

module.exports = new mongoose.model("Quiz", quizSchema);
