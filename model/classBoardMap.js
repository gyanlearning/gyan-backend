const mongoose=require("mongoose");
const classBoardMap=new mongoose.Schema({
    classId:{
        type:mongoose.Schema.Types.ObjectId
    },
    boardId:{
        type:mongoose.Schema.Types.ObjectId
    },
    createdBy:{type:Object},
    updatedBy:{type:Object}
});
module.exports=new mongoose.model("ClassBoardMap",classBoardMap);