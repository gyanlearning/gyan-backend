const mongoose=require("mongoose");
const quizUserSchema=new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId},
    answer:[
        {
            answer1:{
                type:String,
            },
            answer2:{
                type:String,
            }
        }
    ],
    createdAt: { type: Date },
    updatedAt: { type: Date },
    createdBy: { type: Object },
    updatedBy: { type: Object },
},{timestamps:true});
module.exports=new mongoose.model("QuizUser",quizUserSchema);