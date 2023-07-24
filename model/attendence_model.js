const mongoose=require("mongoose");
//This is a collection for store student daily track
const attendenceSchema=new mongoose.Schema({
    student_id:{type:mongoose.Schema.ObjectId},
    lession_id:{type:mongoose.Schema.ObjectId},
    present:{type:Boolean},
    absence:{type:mongoose.Schema.ObjectId},
    created_at:Date,
    updated:Date,
},{timestamps:true});
module.exports=new mongoose.model("Attendence",attendenceSchema);