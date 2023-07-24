const router=require("express").Router();
const {AddNewSession,GetSession}=require("../controller/session_controller")

router.post("/session",AddNewSession);
//Get Session
router.get("/session",GetSession)
module.exports=router