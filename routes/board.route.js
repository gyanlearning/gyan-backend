const {
  AddNewBoard,
  GetBoardData,
  GetBoardByName,
  UpdateSpecificBoardData,
  UpdateAllBoardData,
  DeleteOneBoardData,
} = require("../controller/board_controller");

const router = require("express").Router();
router.post("/board/add", AddNewBoard);
router.get("/boards", GetBoardData);
router.get("/board/boardName", GetBoardByName);
router.patch("/board/:boardName", UpdateSpecificBoardData);
router.put("/board/:boardName", UpdateAllBoardData);
router.delete("/delete/:boardName", DeleteOneBoardData);
module.exports = router;
