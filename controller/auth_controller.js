const User = require("../model/User_model");
const bcryptJs = require("bcrypt");
const otplib = require("otplib");
const secret = otplib.authenticator.generateSecret();
const token = otplib.authenticator.generate(secret);
const { SendOtp } = require("../utils/otp.util");
const jwt = require("jsonwebtoken");
const {setLocalStorage,removeLocalStorage}=require("../middleware/jwt");
const Login = async (req, res) => {
  try {
    //const hashNumber=await bcryptJs.hash(req.body.mobile,10);
    if (await User.findOne({ mobile: req.body.mobile })) {
      const token = otplib.authenticator.generate(secret);
      await User.findOneAndUpdate(
        { mobile: req.body.mobile },
        { otp: token, otpExpiresAt: new Date(Date.now() + 10 * 60 * 1000) },
        { new: true }
      )
        .then((updatedUser) => {
          res.status(201).json({ message: "OTP sent successfully" });
        })
        .catch((error) => {
          res
            .status(501)
            .json({ message: "OTP cannot send,internal server error " });
        });
      await SendOtp(req.body.mobile, token);
    } else {
      const newNumber = new User({
        mobile: req.body.mobile,
        otp: token,
        createdAt: Date.now(),
        otpExpiresAt: new Date(Date.now() + 10 * 60 * 1000),
      });

      if (await SendOtp(req.body.mobile, token)) {
        newNumber.save();
        res.status(200).json({ message: "OTP sent successfully" });
      } else {
        res.status(203).json({ message: "OTP cannot send " });
      }
    }
  } catch (error) {
    console.error("Failed to send OTP", error);
    res.status(500).json({ error: "Failed to send OTP" });
  }
};
const verfiyOtp = async (req, res) => {
  const { mobile, otp } = req.body;

  // Find the user in the database
  const user = await User.findOne({ mobile });

  if (!user) {
    return res.status(401).json({ error: "User not found" });
  }

  // Check if OTP has expired
  if (user.otpExpiresAt < new Date()) {
    return res.status(401).json({ error: "OTP expired" });
  }

  // Compare the provided OTP with the stored OTP
  if (otp == user.otp) {
    await User.findOneAndUpdate(
      { mobile: req.body.mobile },
      { otp: "", otpExpiresAt: "" },
      { new: true } // To return the updated document
    );
    const tokens = jwt.sign({ user: user }, process.env.JWT_SECRET_KEY, {
      expiresIn: "10d",
    });
    setLocalStorage('user', user);
    
    // Set the JWT token in a cookie
    res.cookie("token",tokens, { httpOnly: true });

    res.status(201).json({ message: " OTP verified" ,"token":tokens});
  } else {
    res.status(203).json({ message: " OTP does not match " });
  }
};

//Logout
const Logout = (req, res) => {
  res
    .clearCookie({
      sameSite: "none",
      secure: true,
    })
    removeLocalStorage('user')
    .status(201)
    .send("user has been logout");
};

module.exports = { Login, verfiyOtp, Logout };
