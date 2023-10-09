const mongoose=require("mongoose");
const adminSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
    },
    createdAt:{type:Date},
    updatedAt:{type:Date},
    createdBy:{type:mongoose.Schema.Types.ObjectId},
    updatedBy:{type:mongoose.Schema.Types.ObjectId}
},{timestamps:true});

module.exports=new mongoose.model("Admin",adminSchema);