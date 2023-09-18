const Class = require("../model/class_model");
const { INTERNAL_SERVER_ERROR, EMPTY_BODY } = require("../utils/error");
const { ObjectId } = require("bson");
const classBoardMap=require("../model/classBoardMap");
const AddNewClass = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(203).json({ message: EMPTY_BODY });
    } else {
      const { className,boardId} = req.body;
      
      if (await Class.findOne({ className: req.body.className })) {
        res.status(200).json({ message: "Class is already exists" });
      } else {
        const newClass = new Class({
           className,
        });
        const isSave = await newClass.save();
        const isclassBoardMapExist=await  classBoardMap.findOne({boardId:boardId,classId:isSave._id.toString()});
        if(isclassBoardMapExist){
          res
          .status(200)
          .json({ message: "New class is added successfully", json: isSave });
        }else{
          const newClassBoardMap=new classBoardMap({
            boardId:boardId,
            classId:isSave._id.toString()
          })
          if(await newClassBoardMap.save()){
            res
            .status(200)
            .json({ message: "New class is added successfully", json: isSave });
          }else {
            res
              .status(500)
              .json({ message: INTERNAL_SERVER_ERROR, error: error });
          }
        }
       
      }
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: INTERNAL_SERVER_ERROR, error: error });
  }
};

const GetClassData = async (req, res) => {
  try {
    const classData = await Class.find();
    return res
      .status(200)
      .json({ message: "Successfully get data", data: classData });
  } catch (error) {
    return res
      .status(500)
      .json({ message: INTERNAL_SERVER_ERROR, error: error });
  }
};

const GetClassByName = async (req, res) => {
  try {
    const classData = await Class.findOne({ className: req.body.className });
    if (classData !== null) {
      return res
        .status(200)
        .json({ message: "Data is found", data: classData });
    }
    return res
      .status(200)
      .json({ message: "Data is not  found", data: classData });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: INTERNAL_SERVER_ERROR, error: error });
  }
};
const UpdateSpecificData = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(203).json({ message: EMPTY_BODY });
    }
    const updated = await Class.findOneAndUpdate(
      { className: req.params.className },
      req.body,
      { new: true }
    );

    if (updated) {
      res.status(200).json({
        message: "Class is successfully updated",
        updatedData: updated,
      });
    }

  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: INTERNAL_SERVER_ERROR, error: error });
  }
};

const UpdateAllClassData = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(203).json({ message: EMPTY_BODY });
    } else {
      const updatedData = await Class.updateMany(
        { className: req.params.className },
        req.body,
        { new: true }
      );
      if (updatedData) {
        res.status(200).json({
          message: "Class is successfully updated",
          updatedData: updatedData,
        });
      } else {
        res.status(500).json({ message: INTERNAL_SERVER_ERROR });
      }
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: INTERNAL_SERVER_ERROR, error: error });
  }
};
const DeleteOneClass = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(203).json({ message: EMPTY_BODY });
    } else {
      const isDelete = await Class.findOneAndDelete({
        className: req.params.className,
      });
      if (isDelete) {
        res.status(200).json({ message: "Successfully delete document " });
      } else {
        res.status(200).json({ message: "Document not found " });
      }
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: INTERNAL_SERVER_ERROR, error: error });
  }
};
module.exports = {
  AddNewClass,
  GetClassData,
  GetClassByName,
  UpdateSpecificData,
  UpdateAllClassData,
  DeleteOneClass,
};
