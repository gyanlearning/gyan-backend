const mongoose=require("mongoose");
const quizUserSchema=new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
    quizId:{type:mongoose.Schema.Types.ObjectId,ref:"Quiz"},
    attempQuestions:[
        {
            questionId:{type:mongoose.Schema.Types.ObjectId,ref:"Question",required:true},
            selectedAnswer:{type:String ,required:true}
        }
    ],
    createdAt:{type:Date},
    updatedAt:{type:Date},
    createdBy:{type:mongoose.Schema.Types.ObjectId},
    updateddBy:{type:mongoose.Schema.Types.ObjectId}
},{timestamps:true});
module.exports=new mongoose.model("QuizResult",quizUserSchema);