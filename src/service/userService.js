const userRepo = require("../repositry/UserRepository");

const bcrypt = require("bcrypt");
const { USER_NOT_FOUND_ERR } = require("../utils/error");
const passwordNotpassword = "PASSWORD_NOT_MATCHED";
const userServices = {};
userServices.login = async (mobile, passsword) => {
  let userDetails;
  try {
    userDetails = await userRepo.getUserDetailsByNumber(mobile);
    if (userDetails === USER_NOT_FOUND_ERR) {
      return USER_NOT_FOUND_ERR;
    }
    if (userDetails !== USER_NOT_FOUND_ERR) {
      const hashPassword = await bcrypt.compare(
        passsword,
        userDetails.password
      );
      if (hashPassword) {
        return userDetails;
      } else {
        return passwordNotpassword;
      }
    }
  } catch (error) {
    throw error;
  }
};
userServices.createProfile=(mobile,password,firstName,lastName)=>{

}

module.exports = userServices;
