const { USER_ALREDADY_EXISTS } = require("../message");
const profileModel = require("../model/profile_model");
const userModel = require("../routes/v1/user/User_model");
const { USER_NOT_FOUND_ERR, SERVER_ERR } = require("../utils/error");
const userRepo = {};
//method for get user details by mobile number and passsword when trying to login
userRepo.getUserDetailsByNumber = async (mobile) => {
  try {
    const userDetails = await userModel.findOne({ mobile: mobile });

    if (userDetails !== null && userDetails !== undefined) {
      return userDetails;
    }
    return USER_NOT_FOUND_ERR;
  } catch (error) {
    return error;
  }
};
userRepo.createProfile = async (mobile, password,firstName,lastName) => {
  try {
    const isUserFound = await userModel.findOne({ mobile: mobile });
    if (isUserFound) {
      return USER_ALREDADY_EXISTS;
    }
    
    let newUser = userModel({
      mobile: mobile,
      password: password,
    });
    let isUserSave = await newUser.save();
    if (isUserSave) {
      var newProfile = profileModel({
        firstName,
        lastName,
        userId: isUserSave._id,
      });
      const savedProfile = await newProfile.save();
      if(savedProfile===null && savedProfile ===undefined){
        await userModel.findOneAndDelete({mobile:mobile});
        return SERVER_ERR;
      }
      if (savedProfile!==null && savedProfile!== undefined) {
        return savedProfile;
      }

    }
  } catch (error) {
    return  error;
  }
};
module.exports = userRepo;
