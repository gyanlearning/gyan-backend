const twilio = require('twilio');

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

module.exports={SendOtp}
