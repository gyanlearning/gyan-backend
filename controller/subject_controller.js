const Subject = require("../model/subject_model");
const { INTERNAL_SERVER_ERROR, EMPTY_BODY } = require("../error");
const { UPDATE_SUCCESS, ADDED_SUCCESS } = require("../message");
const ClassBoardSubject=require("../model/classBoardSubjectMap");
const classBoardMap=require("../model/classBoardMap");

const CreateSubject = async (req, res) => {
  if (req.body.name == null && req.body.description == null) {
    return res.status(203).json({ message: EMPTY_BODY });
  }
  try {
    if (await Subject.findOne({ name: req.body.name })) {
      return res.status(203).json({ message: "Subject is already exists" });
    } else {
      const { name, description } = req.body;
      const newSubject = new Subject({
        name,
        description,
      
      });
      const isSaved = await newSubject.save();
      if (isSaved) {
        return res.status(200).json({ message: ADDED_SUCCESS, isSaved });
      } else {
        return res.status(501).json({ message: INTERNAL_SERVER_ERROR });
      }
    }
  } catch (error) {
    //console.log(error);
    return res.status(501).json({ message: INTERNAL_SERVER_ERROR });
  }
};

const updateSubject = async (req, res) => {
  if (req.body.name == null && req.body.description == null) {
    return res.status(203).json({ message: EMPTY_BODY });
  }

  try {
    const { name, description } = req.body;
    if (await Subject.findOne({ name: req.params.name })) {
      const isUpdate = await Subject.update(
        { name, description },
        { new: true }
      );
      if (isUpdate) {
        return res.status(203).json({ message: UPDATE_SUCCESS });
      } else {
        return res.status(501).json({ message: INTERNAL_SERVER_ERROR });
      }
    }
  } catch (error) {
    //console.log(error)
    return res.status(501).json({ message: INTERNAL_SERVER_ERROR });
  }
};

const deleteSubject = async (req, res) => {


  try {
    const isDelete=await Subject.findOneAndDelete({name:req.params.name});
    if(isDelete){
       return res.status(203).json({message:"Successfully delete document"})
    }
  } catch (error) {
    console.log(error);
    return res.status(501).json({ message: INTERNAL_SERVER_ERROR });
  }
};
const getSubjectByClassAndBoard=async(req,res)=>{
  try {
    //const {classId,boardId}=req.body;
    const {classId, boardId} =req.query;
    console.log('Query ==>>',req.query);
    //console.log(req.body)
    var Id=await classBoardMap.findOne({classId,boardId});
    
    let isFind=await ClassBoardSubject.find({classBoardMapId:Id._id.toString()}).populate("subjectId");
    if(isFind){
        return res.status(200).json({subject:isFind})   
    }
  } catch (error) {
    console.log(error)
    return res.status(501).json({ message: INTERNAL_SERVER_ERROR });
  }
  
}
module.exports = { CreateSubject, updateSubject ,deleteSubject,getSubjectByClassAndBoard};
