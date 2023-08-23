const mongoose=require("mongoose");
const classBoardSubjectSchema=new mongoose.Schema({
    classBoardMapId:{type:mongoose.Schema.Types.ObjectId,ref:"ClassBoardMap"},
    subjectId:{type:mongoose.Schema.Types.ObjectId,ref:"Subject"},
    createdBy:{type:mongoose.Schema.Types.ObjectId},
    updatedBy:{type:mongoose.Schema.Types.ObjectId},
    createdAt:{type:Date},
    updatedAt:{type:Date},
  
},{timestamps:true});
module.exports=new mongoose.model("ClassBoardSubjectSchema",classBoardSubjectSchema);