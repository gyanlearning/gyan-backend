const repository = require("../../repositry/userRepo");
const classBoardMap = require("../../model/classBoardMap");
const { SERVER_ERR } = require("../../utils/error");
const classBoardUserMapService = {};
classBoardUserMapService.addNewClassBoard = async (
  userId,
  classId,
  boardId
) => {
  try {
    const isUserCBMap = await repository.getClassMapByUserId(userId);

    if (isUserCBMap == "CLASS_MAP_NOT_FOUND") {
      let classBoardMapId = await classBoardMap.findOne({
        classId: classId,
        boardId: boardId,
      });
      const newUserMap = await repository.addClassBoard(
        userId,
        classBoardMapId._id.toString()
      );
      if (newUserMap) {
        return newUserMap;
      }
      return SERVER_ERR;
    }
    return isUserCBMap;
  } catch (error) {
    //console.log(error);
    return error;
  }
};
classBoardUserMapService.getClassBoard = async (userId) => {
  try {
    let classBoard = await repository.readClassBoard(userId);
    if (classBoard == SERVER_ERR) {
      return SERVER_ERR;
    }
    return classBoard;
  } catch (error) {
    return SERVER_ERR;
  }
};

classBoardUserMapService.updateClassBoardMap = async (
  userId,
  classId,
  boardId
) => {
  try {
    let classBoardMapId = await classBoardMap.findOne({
      classId: classId,
      boardId: boardId,
    });
    const updatedData = await repository.update(
      userId,
      classBoardMapId._id.toString()
    );

    if (updatedData === SERVER_ERR || updatedData === undefined) {
      return SERVER_ERR;
    }
    return updatedData;
  } catch (error) {
    return SERVER_ERR;
  }
};
const { addNewClassBoard, getClassBoard, updateClassBoardMap } =
  classBoardUserMapService;
module.exports = { addNewClassBoard, getClassBoard, updateClassBoardMap };
