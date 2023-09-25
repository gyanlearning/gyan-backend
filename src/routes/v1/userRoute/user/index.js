const express = require("express");
const router = express.Router();
const userController=require("../../../../controller/userController/user")
const { jwtService } = require("../../middleware/jwt");
//const userController = require("../../../controller/user/authController");
router.post("/login",userController.Login);
router.post("/signup", userController.Signup);
router.post("/logout", jwtService.authenticate, userController.Logout);
router.get("/:id", jwtService.authenticate,userController.GetUser);
router.get("/users", userController.GetAllUser);
router.get("/user/name/", userController.GetUserByName);
//router.post("/otp", verfiyOtp);
router.post("/createprofile", jwtService.authenticate, userController.CreateProfile);
router.put("/updateprofile/:id", jwtService.authenticate, userController.UpdateProfile);

module.exports = router;
