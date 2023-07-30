const mongoose=require("mongoose");
const boardSchema=new mongoose.Schema({
    boardName:{type:String,required:true},
    createdAt: { type: Date },
},{ timestamps: true });
module.exports=mongoose.model("Board",boardSchema);