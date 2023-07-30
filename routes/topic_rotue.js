const router=require("express").Router();
const InsertNewTopic=require("../controller/topic_controller")
router.post("/addTopic",InsertNewTopic);


module.exports=router;
