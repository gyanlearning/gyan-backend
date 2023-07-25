const express =require("express");
const router=express.Router();
const {Login,verfiyOtp,Logout}=require("../controller/auth_controller")
const {GetAllUser,CreateProfile,GetUserById,GetUserByName,UpdateProfile}=require("../controller/user_controller")
const authenticate=require("../middleware/jwt")

router.post("/user",Login);
router.post("/logout",authenticate,Logout)
router.get("/user/id",authenticate,GetUserById);
router.get("/users",GetAllUser);
router.get("/user/name/",GetUserByName);
router.post("/otp",verfiyOtp);
router.post("/createprofile",authenticate,CreateProfile);
router.put("/updateprofile/:id",UpdateProfile);


module.exports=router;
