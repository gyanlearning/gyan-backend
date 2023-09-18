const ClassBoardUserMap = require("../../model/classBoardUserMap");
const ClassBoardMap = require("../../model/classBoardMap");
const CreateError = require("../error.js");
const ClassModel = require("../../model/class_model");
const Board_model = require("../../model/Board_model");

const SetMappingforUser=async(req,res)=>{
  if (req.body === "undefined") {
    return res.status(304).json({ message: "Body is empty!" });
  }
  try{
    const {userId,classId,boardId}=req.body
   
    if(userId===null && userId==='undefined' && !userId){
      return res.CreateError(304,"UserId not found");
    }else {
      const isExist=await ClassBoardUserMap.findOne({userId});
      if(isExist){
        return res.json(CreateError(304,"Class or board already exists"));
      }else{
      const isClassBoardExist =  await ClassBoardMap.findOne({classId,boardId})
      if(isClassBoardExist) {
        const newClassuserMap=new ClassBoardUserMap({
          userId,
          classBoardMapId: isClassBoardExist._id.toString()
        });
        const isSaved=await  newClassuserMap.save()

      if(isSaved){
       const current_doc=await isSaved.populate("classBoardMapId");
       const classBoard=await ClassBoardMap.findById({_id:current_doc.classBoardMapId._id.toString()}).populate("classId").populate("boardId")
      
       
        return res.status(201).json({message:"User maped with class and board",classBoardUser:isSaved,classBoard})
      }
      } else {
        const newClassBoard=new ClassBoardMap({
          classId,
          boardId,
        });
      const isSave=await   newClassBoard.save();
        const newClassuserMap=new ClassBoardUserMap({
          userId,
          classBoardMapId: isSave._id.toString()
        });

        if( newClassuserMap.save()){
          return res.json(CreateError(200,"Add class board to your profile"))
        }else{
          res.json(CreateError(400,"Error while processing"));
        }
      } 
       
      }
    }
  }catch(error){
   console.log(error);
    return res.json(CreateError(500, "INTERNAL_SERVER_ERROR"));

  }
}

const GetClassBoard = async (req, res) => {
  try {
    const classes= await ClassModel.find({});
    const boards = await Board_model.find({});
    return res.status(200).json({classes,boards});

  } catch (error) {
    console.log(error);
    return res.json(CreateError(500, "INTERNAL_SERVER_ERROR"));
  }
};
module.exports = {GetClassBoard,SetMappingforUser};
