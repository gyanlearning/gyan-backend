const express =require("express");
const router=express.Router();
const {Login,verfiyOtp}=require("../controller/user_controller")

router.post("/user",Login)
router.post("/otp",verfiyOtp)

module.exports=router