const userClassBoardMap = require("../../model/classBoardUserMap");
const { SERVER_ERR } = require("../../utils/error");

const classBoardMapRepo = {};
//respositry for class-board map
//check userMap is available or not
classBoardMapRepo.findUserById = async (userId) => {
  try {
    const isclassBoardMapExists = await userClassBoardMap.findOne({
      userId: userId,
    });
    if (isclassBoardMapExists == null || isclassBoardMapExists == undefined) {
      return "CLASS_MAP_NOT_FOUND";
    }
    return isclassBoardMapExists;
  } catch (error) {
    console.log(error);
    return error;
  }
};

//add new class board to the user profile
classBoardMapRepo.addClassBoard = async (classId, boardId, userId) => {
  try {
    let classBoardMap;
    classBoardMap = new userClassBoardMap({
      classId: classId,
      boardId: boardId,
      userId: userId,
    });
    const isSaved = await classBoardMap.save();
    if (isSaved !== null || isSaved !== undefined) {
      return isSaved;
    }
  } catch (error) {
    // console.log(error);
    return SERVER_ERR;
  }
};
classBoardMapRepo.updateClassBoard = async (userId, classId, boardId) => {
  try {
    const updateClassBoardMap = await userClassBoardMap.findByIdAndUpdate(
      {
        userId: userId,
      },
      { classId: classId, boardId: boardId }
    );
    if (updateClassBoardMap == null || updateClassBoardMap == undefined) {
      return SERVER_ERR;
    }
    return updateClassBoardMap;
  } catch (error) {
    console.log(error);
    return SERVER_ERR;
  }
};
const { addClassBoard, updateClassBoard, findUserById } =
  classBoardMapRepo;
module.exports = { addClassBoard, updateClassBoard, findUserById};
