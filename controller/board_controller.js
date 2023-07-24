const Board = require("../model/Board_model");
const { INTERNAL_SERVER_ERROR, EMPTY_BODY } = require("../error");
const { ObjectId } = require("bson");

const AddNewBoard = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(203).json({ message: EMPTY_BODY });
    } else {
      if (await Board.findOne({ boardName: req.body.boardName })) {
        res.status(200).json({ message: "Class is already exists" });
      } else {
        const newBoard = new Board({
          boardName: req.body.boardName,

          createdAt: Date.now(),
        });
        const isSave = await newBoard.save();
        if (isSave) {
          res
            .status(200)
            .json({ message: "New Board is added successfully", json: isSave });
        } else {
          res
            .status(500)
            .json({ message: INTERNAL_SERVER_ERROR, error: error });
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

const GetBoardData = async (req, res) => {
  try {
    const boardData = await Board.find();
    if (boardData !== null) {
      return res
        .status(200)
        .json({ message: "Empty Document", data: boardData });
    }
    return res
      .status(200)
      .json({ message: "Successfully get board data", data: boardData });
  } catch (error) {
    return res
      .status(500)
      .json({ message: INTERNAL_SERVER_ERROR, error: error });
  }
};

const GetBoardByName = async (req, res) => {
  try {
    const boardData = await Board.findOne({ boardName: req.body.boardName });
    if (boardData !== null) {
      return res
        .status(200)
        .json({ message: "Data is found", data: boardData });
    }
    return res
      .status(200)
      .json({ message: "Data is not  found", data: boardData });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: INTERNAL_SERVER_ERROR, error: error });
  }
};
const UpdateSpecificBoardData = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(203).json({ message: EMPTY_BODY });
    }
    const isUpdated = await Board.findOneAndUpdate(
      { boardName: req.params.boardName },
      req.body,
      { new: true }
    );

    if (isUpdated) {
      res.status(200).json({
        message: "Board document is successfully updated",
        updatedData: isUpdated,
      });
    }
    res.status(500).json({ message: INTERNAL_SERVER_ERROR });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: INTERNAL_SERVER_ERROR, error: error });
  }
};

const UpdateAllBoardData = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(203).json({ message: EMPTY_BODY });
    } else {
      const updatedData = await Board.updateMany(
        { boardName: req.params.boardName },
        req.body,
        { new: true }
      );
      if (updatedData) {
        res.status(200).json({
          message: "Board document is successfully updated",
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
const DeleteOneBoardData = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(203).json({ message: EMPTY_BODY });
    } else {
      const isDelete = await Board.findOneAndDelete({
        boardName: req.params.boardName,
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
  AddNewBoard,
  GetBoardByName,
  GetBoardData,
  UpdateAllBoardData,
  UpdateSpecificBoardData,
  DeleteOneBoardData,
};
