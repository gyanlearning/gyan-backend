const userModel=require("../routes/v1/user/User_model");
const { USER_NOT_FOUND_ERR } = require("../utils/error");
const userRepo = {};
//method for get user details by mobile number and passsword when trying to login 
userRepo.getUserDetailsByNumber = async (mobile) => {
  try {
    const userDetails=await userModel.findOne({mobile:mobile});
    
    if(userDetails!==null && userDetails!==undefined){
        
        return userDetails;
    }
    return USER_NOT_FOUND_ERR;
    
  } catch (error) {return error}
};

module.exports= userRepo;
