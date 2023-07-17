const express =require("express");
const router=express.Router();
const {Login,verfiyOtp}=require("../controller/auth_controller")
const CreateProfile=require("../controller/user_controller")
const authenticate=require("../middleware/jwt")

router.post("/user",Login)
router.post("/otp",verfiyOtp);
router.post("/updateprofile",authenticate,CreateProfile)
module.exports=router