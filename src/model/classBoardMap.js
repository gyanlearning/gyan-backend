const mongoose=require("mongoose");
const classBoardMap=new mongoose.Schema({
    classId:{
        type:mongoose.Schema.Types.ObjectId ,
        ref:"Class"
    },
    boardId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Board"
    },
    createdBy:{type:Object,ref:"User"},
    updatedBy:{type:Object,ref:"User"},
    createAt:{type:Date},
    updatedAt:{type:Date}
});
module.exports=new mongoose.model("ClassBoardMap",classBoardMap);