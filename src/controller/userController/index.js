//authencitcation import
const {
  SignupController,
  Logout,
  LoginController,
} = require("./user/authController");
const {
  CreateProfile,
  GetAllUser,
  GetUser,
  UpdateProfile,
  GetUserByName,
} = require("./user/userController");
//seting up in json format

//importimg controller for user-map class and board
const {
  addNewuserClassBoardMap,
  getUserClassBoard,
  updateClassBoard,
} = require("./classBoardMap/classBoardMap");
const userController = {
  Signup: SignupController,
  Login: LoginController,
  Logout: Logout,
  CreateProfile: CreateProfile,
  GetUser: GetUser,
  GetAllUser: GetAllUser,
  UpdateProfile: UpdateProfile,
  GetUserByName: GetUserByName,
  userMapClassBoard: addNewuserClassBoardMap,
  getUserClassBoard: getUserClassBoard,
  updateClassBoard: updateClassBoard,
};

module.exports = userController;
