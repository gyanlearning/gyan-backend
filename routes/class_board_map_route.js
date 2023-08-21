const router=require("express").Router();
const InsertNewClassBoardMap=require("../controller/Class_Board_map");
const GetClassBoard = require("../controller/class_board_map_controller");

router.post("/class-board-map",InsertNewClassBoardMap);
router.get("/classes-board",GetClassBoard)
module.exports=router;
