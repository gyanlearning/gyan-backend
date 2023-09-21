const express = require("express");
const router = express.Router();
const { Logout, Signup,userController } = require("../../../controller/user/authController");

const {
  GetAllUser,
  CreateProfile,
  GetUser,
  GetUserByName,
  UpdateProfile,
} = require("../../../controller/user/userController");
const { authenticate } = require("../../../middleware/jwt");
//const userController = require("../../../controller/user/authController");
router.post("/login",userController.LoginController);
router.post("/signup", Signup);
router.post("/logout", authenticate, Logout);
router.get("/user/:id", GetUser);
router.get("/users", GetAllUser);
router.get("/user/name/", GetUserByName);
//router.post("/otp", verfiyOtp);
router.post("/createprofile", authenticate, CreateProfile);
router.put("/updateprofile/:id", authenticate, UpdateProfile);

module.exports = router;
