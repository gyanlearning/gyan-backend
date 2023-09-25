const express = require("express");
const router = express.Router();
const userController = require("../../../../controller/userController/index");
const { jwtService } = require("../../middleware/jwt");
//const userController = require("../../../controller/user/authController");
router.post("/login", userController.Login);
router.post("/signup", userController.Signup);
router.post("/logout", jwtService.authenticate, userController.Logout);
router.get("/:id", jwtService.authenticate, userController.GetUser);
router.get("/users", userController.GetAllUser);
router.get("/user/name/", userController.GetUserByName);
//post user class aur board data;
router.post(
  "/class-board-map",
  jwtService.authenticate,
  userController.userMapClassBoard
);

//router.post("/otp", verfiyOtp);
router.post(
  "/createprofile",
  jwtService.authenticate,
  userController.CreateProfile
);
//get classBoard
router.get(
  "/class/board/",
  jwtService.authenticate,
  userController.getUserClassBoard
);
//update class and board
router.put(
  "/class-board/",
  jwtService.authenticate,
  userController.updateClassBoard
);
router.put(
  "/updateprofile/:id",
  jwtService.authenticate,
  userController.UpdateProfile
);

module.exports = router;
