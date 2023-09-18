const mongoose=require("mongoose");
const quizUserSchema=new mongoose.Schema({
    quizId:{type:mongoose.Schema.Types.ObjectId,ref:"Question"},
    classBoardSubjectChapterQuestionId:{type:mongoose.Schema.Types.ObjectId,ref:"ClassBoardSubjectChapterQuestion"},     
    createdAt: { type: Date },
    updatedAt: { type: Date },
    createdBy: { type: Object },
    updatedBy: { type: Object },
},{timestamps:true});
module.exports=new mongoose.model("QuizQuestion",quizUserSchema);