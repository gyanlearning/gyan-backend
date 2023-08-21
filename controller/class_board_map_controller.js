const ClassBoardUserMap=require("../model/classBoardUserMap");
const ClassBoardMap =require("../model/classBoardMap");
const CreateError=require("../error.js")
const GetClassBoard = async (req, res) => {
    try {   
 const data= await ClassBoardMap.find({})
 .populate("classId")
 .populate("boardId");
 if(data===null){
  return res.json(CreateError(200,"Data not found"));
 }else{
  return res.status(200).json({data})
 }
    } catch (error) {
      console.log(error);
     return res.json(CreateError(500,"INTERNAL_SERVER_ERROR"));
    }    
};
module.exports=GetClassBoard;

