const {
  SignupController,
  Logout,
  LoginController,
} = require("./authController");
const {
  CreateProfile,
  GetAllUser,
  GetUser,
  UpdateProfile,
  GetUserByName,
} = require("./userController");
const userController = {
  Signup: SignupController,
  Login: LoginController,
  Logout: Logout,
  CreateProfile: CreateProfile,
  GetUser: GetUser,
  GetAllUser: GetAllUser,
  UpdateProfile: UpdateProfile,
  GetUserByName: GetUserByName,
};

module.exports = userController;
