const mongoose=require("mongoose");
const chapterClassBoardSubjectMap=new mongoose.Schema({
    classBoardSubjectMapId:{type:mongoose.Schema.Types.ObjectId},
    chapterId:{type:mongoose.Schema.Types.ObjectId},
    createdBy:{type:mongoose.Schema.Types.ObjectId},
    updatedBy:{type:mongoose.Schema.Types.ObjectId},
    createdAt:{type:Date},
    updatedAt:{type:Date},
  
},{timestamps:true});
module.exports=new mongoose.model("ChapterMapping",chapterClassBoardSubjectMap);