const mongoose =require("mongoose");

const userEductionMappingSchema=new mongoose.Schema({
    classId:{type:mongoose.Schema.Types.ObjectId,ref:"Class"},
    profileId:{type:mongoose.Schema.Types.ObjectId,ref:"Profile"},
    boardId:{type:mongoose.Schema.Types.ObjectId,ref:"Board"},
    subjectId:{type:mongoose.Schema.Types.ObjectId,ref:"Subject"},
    createdBy: { type: Object },
    updatedBy: { type: Object },
    createdAt: { type: Date },
    updatedAt: { type: Date },
},{timestamps:true});
module.exports=new mongoose.model("UserEducationMapping",userEductionMappingSchema);