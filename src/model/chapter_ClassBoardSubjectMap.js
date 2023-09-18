const mongoose=require("mongoose");
const chapterClassBoardSubjectMap=new mongoose.Schema({
    classBoardSubjectMapId:{type:mongoose.Schema.Types.ObjectId,ref:"ClassBoardSubjectSchema"},
    chapterId:{type:mongoose.Schema.Types.ObjectId,ref:"Chapter"},
    createdBy:{type:mongoose.Schema.Types.ObjectId},
    updatedBy:{type:mongoose.Schema.Types.ObjectId},
    createdAt:{type:Date},
    updatedAt:{type:Date},
  
},{timestamps:true});
module.exports=new mongoose.model("ChapterMapping",chapterClassBoardSubjectMap);