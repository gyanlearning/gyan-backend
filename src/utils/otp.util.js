const twilio = require('twilio');
const config=require("../config")
const SendOtp = async (mobile,otp) => {
  const accountSid = config.ACCOUNT_SID;
  const authToken = config.ACCOUNT_TOKEN
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

module.exports={SendOtp}
