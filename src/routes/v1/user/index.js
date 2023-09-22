const express = require("express");
const router = express.Router();
const { Logout, SignupController,LoginController } = require("../../../controller/user/authController");

const {
  GetAllUser,
  CreateProfile,
  GetUser,
  GetUserByName,
  UpdateProfile,
} = require("../../../controller/user/userController");
const { jwtService } = require("../middleware/jwt");
//const userController = require("../../../controller/user/authController");
router.post("/login",LoginController);
router.post("/signup", SignupController);
router.post("/logout", jwtService.authenticate, Logout);
router.get("/:id", jwtService.authenticate,GetUser);
router.get("/users", GetAllUser);
router.get("/user/name/", GetUserByName);
//router.post("/otp", verfiyOtp);
router.post("/createprofile", jwtService.authenticate, CreateProfile);
router.put("/updateprofile/:id", jwtService.authenticate, UpdateProfile);

module.exports = router;
