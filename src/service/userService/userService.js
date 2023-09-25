const userRepo = require("../../repositry/userRepo/UserRepository");

const bcrypt = require("bcrypt");
const { USER_NOT_FOUND_ERR, SERVER_ERR } = require("../../utils/error");
const { USER_ALREDADY_EXISTS } = require("../../message");
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
userServices.signup = async (mobile, password, firstName, lastName) => {
  

  try {
  const  userProfile = await userRepo.createProfile(
      mobile,
      password,
      firstName,
      lastName
    );
    
    if (userProfile === "USER_ALREADY_EXISTS") {
      return "USER_ALREADY_EXISTS";
    }
    if(userProfile===SERVER_ERR){
      return SERVER_ERR;
    }
    return userProfile;
  } catch (error) {
    //console.log("err",error);
    throw error;
  }
};
userServices.getUserById=async(id)=>{
  try {
    const user=await userRepo.getUserDetailsById(id);
    const userPayload={
      mobile:user.userId.mobile,
      firstName:user.firstName,
      lastName:user.lastName
    }
    return userPayload;
  } catch (error) {
    return error; 
  }
}
userServices.addClassBoard=async(classId,boardId,userId)=>{
  try {
    //let isUserExist=await ;
    isUserExist=await userModel
  } catch (error) {
    
  }
}

module.exports = userServices;
