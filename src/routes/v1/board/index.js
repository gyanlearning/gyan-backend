const board = require("../../../controller/board/boardController");

const router = require("express").Router();
router.post("/board/add", board.AddNewBoard);
router.get("/boards", board.GetBoardData);
router.get("/board/boardName", board.GetBoardByName);
router.patch("/board/:boardName", board.UpdateSpecificBoardData);
router.put("/board/:boardName", board.UpdateAllBoardData);
router.delete("/baord/delete/:boardName", board.DeleteOneBoardData);
module.exports = router;
