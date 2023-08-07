const express = require("express");
const router = express.Router();
const { Login, verfiyOtp, Logout } = require("../controller/auth_controller");
const {
  GetAllUser,
  CreateProfile,
  GetUser,
  GetUserByName,
  UpdateProfile,
} = require("../controller/user_controller");
const {authenticate} = require("../middleware/jwt");

router.post("/login", Login);
router.post("/logout", authenticate, Logout);
router.get("/user", authenticate, GetUser);
router.get("/users", GetAllUser);
router.get("/user/name/", GetUserByName);
router.post("/otp", verfiyOtp);
router.post("/createprofile", authenticate, CreateProfile);
router.put("/updateprofile/:id", authenticate, UpdateProfile);

module.exports = router;
