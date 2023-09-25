const statusCode = require("../../../message");
const userService = require("../../../service/userService/index");
const { INTERNAL_SERVER_ERROR } = require("../../../utils/error");
const { SERVER_ERR } = require("../../../utils/error");

const userClassBoardMapController = {};

userClassBoardMapController.addNewuserClassBoardMap = async (req, res) => {
  const currentUser = req.user;
  try {
    //get current user from token

    //console.log(currentUseruser.userId._id)

    if (currentUser) {
      const { classId, boardId } = req.body;
      if (
        classId == null ||
        classId == undefined ||
        boardId == null ||
        boardId == undefined
      ) {
        return res.status(422).json({ message: "Request body is empty" });
      }

      const classBoardMap = await userService.addNewClassBoard(
        currentUser.userId._id,
        classId,
        boardId
      );

      if (classBoardMap === SERVER_ERR) {
        return res.status(503).json({ message: "Failed to added " });
      }
      return res.status(200).json({ data: classBoardMap });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};
userClassBoardMapController.getUserClassBoard = async (req, res) => {
  try {
    const userId = req.user.userId._id;

    const data = await userService.getClassBoard(userId);
    if (data === SERVER_ERR) {
      return createError(statusCode.NOT_FOUND, "Server error");
    }
    return res.status(200).json({ data: data });
  } catch (error) {
    return res.status(500).json({ message: "INTERNAL SERVER ERROR" });
  }
};
userClassBoardMapController.updateClassBoard = async (req, res) => {
  try {
    const userId = req.user.userId._id;
    const { classId, boardId } = req.body;
    const data = await userService.updateClassBoardMap(
      userId,
      classId,
      boardId
    );

    if (data === SERVER_ERR || data === undefined) {
      return res.status(503).json({ message: "INTERNAL_SERVER_ERROR" });
    }
    return res
      .status(statusCode.HTTP_SUCCESS)
      .json({ message: "Successfully updated class Board", data: data });
  } catch (error) {
    console.log(error);
    return res
      .status(statusCode.INTERNAL_SERVER)
      .json({ message: INTERNAL_SERVER_ERROR });
  }
};
const { addNewuserClassBoardMap, getUserClassBoard, updateClassBoard } =
  userClassBoardMapController;
module.exports = {
  addNewuserClassBoardMap,
  getUserClassBoard,
  updateClassBoard,
};
