const userClassBoardMap = require("../../model/classBoardUserMap");
const { SERVER_ERR } = require("../../utils/error");

const classBoardMapRepo = {};
//respositry for class-board map
//check userMap is avcailable or not
classBoardMapRepo.getClassMapByUserId = async (userId) => {
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
classBoardMapRepo.addClassBoard = async (userId, classBoardMapId) => {
  try {
    let classBoardMap;
    classBoardMap = new userClassBoardMap({
      userId: userId,
      classBoardMapId: classBoardMapId,
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
classBoardMapRepo.update = async (userId, classBoardMapId) => {
  try {
    const updateClassBoardMap = await userClassBoardMap.findOneAndUpdate(
      {
        userId: userId,
      },
      { classBoardMapId: classBoardMapId }
    );

    if (updateClassBoardMap == null || updateClassBoardMap == undefined) {
      return SERVER_ERR;
    }
    return updateClassBoardMap;
  } catch (error) {
    // console.log(error);
    return SERVER_ERR;
  }
};
classBoardMapRepo.readClassBoard = async (userId) => {
  try {
    const classBoard = await userClassBoardMap
      .findOne({ userId: userId })
      .populate({
        path: "classBoardMapId",
        populate: {
          path: "classId boardId",
        },
      });

    return classBoard;
  } catch (error) {
    return SERVER_ERR;
  }
};
const { addClassBoard, update, getClassMapByUserId, readClassBoard } =
  classBoardMapRepo;
module.exports = { addClassBoard, update, getClassMapByUserId, readClassBoard };
