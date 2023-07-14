const User=require("../model/User_model");
const bcryptJs=require("bcrypt");
const twilio = require('twilio');
const otplib=require("otplib")
const secret = otplib.authenticator.generateSecret();
const token = otplib.authenticator.generate(secret);
// const fast2sms = require("fast-two-sms");

const { SendOtp, generateOTP } = require("../utils/otp.util");

const Login=async (req,res)=>{
   

   try {
   //const hashNumber=await bcryptJs.hash(req.body.mobile,10);
   
   
   
   const newNumber=new User({
      mobile:req.body.mobile,
      otp:token,
      createdAt:Date.now(),
      otpExpiresAt:new Date(Date.now() + 10 * 60 * 1000),

   });
   
   const createUser=await newNumber.save();
   
   await SendOtp(req.body.mobile,token);
      
      res.json({ message: 'OTP sent successfully' });
    } catch (error) {
      console.error('Failed to send OTP', error);
      res.status(500).json({ error: 'Failed to send OTP' });
    }
   
  
}
const verfiyOtp=async(req,res)=>{
   const { mobile, otp } = req.body;

   // Find the user in the database
   const user = await User.findOne({ mobile });
 
   if (!user) {
     return res.status(401).json({ error: 'User not found' });
   }
 
   // Check if OTP has expired
   if (user.otpExpiresAt < new Date()) {
     return res.status(401).json({ error: 'OTP expired' });
   }
 
   // Compare the provided OTP with the stored OTP
   
 
   if (otp ==user.otp) {
      User.findOneAndUpdate(
         {mobile:req.body.mobile},
          { otp: '', otpExpiresAt: '' },
          { new: true } // To return the updated document
        )
          .then(updatedUser => {
            console.log('Updated User:', updatedUser);
          })
          .catch(error => {
            console.error('Failed to update user:', error);
          });
    }
      res.status(200).json({ message: ' OTP verified' });
   }
 
   // OTP is valid, delete it from the user document

module.exports={Login,verfiyOtp}