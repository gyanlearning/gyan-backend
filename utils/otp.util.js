const fast2sms = require("fast-two-sms");
const twilio = require('twilio');

const generateOTP = (otp_length) => {
  // Declare a digits variable
  // which stores all digits
  var digits = "0123456789";
  let OTP = "";
  for (let i = 0; i < otp_length; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
};

const SendOtp = async (mobile,otp) => {

  const accountSid = process.env.ACCOUNT_SID;
  const authToken = process.env.ACCOUNT_TOKEN


  const client = new twilio(accountSid, authToken);
  
  client.messages
    .create({
      body: `Your Otp is valid for 10 minute ${otp}`,
      to: mobile, 
      from: '+13258800044',
    })
    .then((message) => console.log(message.sid));
      
  return otp;
  
};

module.exports={generateOTP,SendOtp}
