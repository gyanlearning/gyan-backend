const router=require("express").Router();
const InsertNewClassBoardMap=require("../controller/Class_Board_map");
const {GetClassBoard ,SetMappingforUser}= require("../controller/class_board_map_controller");

//admin
router.post("/class-board-map",InsertNewClassBoardMap);
//for user

router.get("/classes-board",GetClassBoard);
router.post("/student/class-map",SetMappingforUser)
module.exports=router;
