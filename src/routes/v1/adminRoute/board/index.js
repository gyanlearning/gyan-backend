const board = require("../../../../controller/board/boardController");

const router = require("express").Router();

router.post("/add", board.AddNewBoard);
router.get("/get", board.GetBoardData);
router.get("/boardName", board.GetBoardByName);
router.patch("/:boardName", board.UpdateSpecificBoardData);
router.put("/:boardName", board.UpdateAllBoardData);
router.delete("/delete/:boardName", board.DeleteOneBoardData);
module.exports = router;
