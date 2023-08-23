const ClassBoardMap = require("../model/classBoardMap");
const CreateError = require("../error");
const Class = require("../model/class_model");
const Board = require("../model/Board_model");



const InsertNewClassBoardMap = async (req, res) => {
  if (req.body === "undefined") {
    return res.status(304).json({ message: "Body is empty!" });
  }
  try {
    const { boardName, className } = req.body;

    let boardId = await Board.findOne({ boardName: boardName });
    let classId = await Class.findOne({ className: className });
    
    if (boardId=== null ) {
     return res.json(CreateError(304, "Not found Board Object"));
    } else if(classId===null){
      return res.json(CreateError(304, "Not found Class Object"));
    } else {
      let isClassAvilable = await ClassBoardMap.findOne({
        classId: classId._id.toString(),
      });
      
      if (isClassAvilable) {
        res.json(CreateError(404, "Class and Board allready exists!"));
      } else {
        const newClassBoardMap = new ClassBoardMap({
          classId: classId._id.toString(),
          boardId: boardId._id.toString(),
        });
        if (await newClassBoardMap.save()) {
          res.status(200).json({message:"Successfully mapped", data: newClassBoardMap });
        } else {
          res.json(CreateError(102, "Error while processing"));
        }
      }
    }
  } catch (error) {
    console.log(error);
    return res.json(CreateError(500, "Internal server error"));
  }
};
module.exports = InsertNewClassBoardMap;
