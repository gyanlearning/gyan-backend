const mongoose=require("mongoose");
const enrollementSchema=new mongoose.Schema({
    classId:{type:mongoose.Schema.Types.ObjectId},
    studentId:{type:mongoose.Schema.Types.ObjectId},
    enrollementDate:{type:String ,required:true},
    cancelation:{type:Boolean ,required:true},
    cancelationReason:{type:String ,required:true},
})
module.exports=mongoose.model("Enrollement", enrollementSchema)