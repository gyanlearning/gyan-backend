const User = require("../../routes/v1/user/User_model");
const Profile = require("../../model/profile_model");
const ClassBoardUser = require("../../model/classBoardUserMap");
const ClassBoardMap=require("../../model/classBoardMap")
const bcryptJs = require("bcrypt");
//const otplib = require("otplib");
// const secret = otplib.authenticator.generateSecret();
// const token = otplib.authenticator.generate(secret);
// const { SendOtp } = require("../utils/otp.util");
const jwt = require("jsonwebtoken");
const { INTERNAL_SERVER_ERROR, USER_NOT_FOUND_ERR } = require("../../utils/error");

// const Login = async (req, res) => {
//   try {
//     //const hashNumber=await bcryptJs.hash(req.body.mobile,10);
//     if (await User.findOne({ mobile: req.body.mobile })) {
//       const token = otplib.authenticator.generate(secret);
//       await User.findOneAndUpdate(
//         { mobile: req.body.mobile },
//         { otp: token, otpExpiresAt: new Date(Date.now() + 10 * 60 * 1000) },
//         { new: true }
//       )
//         .then((updatedUser) => {
//           res.status(201).json({ message: "OTP sent successfully" });
//         })
//         .catch((error) => {
//           res
//             .status(501)
//             .json({ message: "OTP cannot send,internal server error " });
//         });
//       await SendOtp(req.body.mobile, token);
//     } else {
//       const newNumber = new User({
//         mobile: req.body.mobile,
//         otp: token,
//         createdAt: Date.now(),
//         otpExpiresAt: new Date(Date.now() + 10 * 60 * 1000),
//       });

//       if (await SendOtp(req.body.mobile, token)) {
//         newNumber.save();
//         res.status(200).json({ message: "OTP sent successfully" });
//       } else {
//         res.status(203).json({ message: "OTP cannot send " });
//       }
//     }
//   } catch (error) {
//     console.error("Failed to send OTP", error);
//     res.status(500).json({ error: "Failed to send OTP" });
//   }
// };
// const verfiyOtp = async (req, res) => {
//   const { mobile, otp } = req.body;

//   // Find the user in the database
//   const user = await User.findOne({ mobile });

//   if (!user) {
//     return res.status(401).json({ error: "User not found" });
//   }

//   // Check if OTP has expired
//   if (user.otpExpiresAt < new Date()) {
//     return res.status(401).json({ error: "OTP expired" });
//   }

//   // Compare the provided OTP with the stored OTP
//   if (otp == user.otp) {
//     await User.findOneAndUpdate(
//       { mobile: req.body.mobile },
//       { otp: "", otpExpiresAt: "" },
//       { new: true } // To return the updated document
//     );
//     const tokens = jwt.sign({ user: user }, process.env.JWT_SECRET_KEY, {
//       expiresIn: "10d",
//     });
//     setLocalStorage('user', user);

//     // Set the JWT token in a cookie
//     res.cookie("token",tokens, { httpOnly: true });

//     res.status(201).json({ message: " OTP verified" ,"token":tokens});
//   } else {
//     res.status(203).json({ message: " OTP does not match " });
//   }
// };

//Logout
const userService=require("../../service/userService");
const createError = require("../../utils/error");
const userController={};
 userController.LoginController = async (req, res) => {
  let userDetails;
  if (req.body === "undefined") {
    return res.status(204).json({ message: "Body is empty!" });
  }
  try {
    const { mobile, password } = req.body;
    if (mobile && password === "") {
      return res.status(204).json({ message: "Email or password empty" });
    } else {
      //const user = await User.findOne({ mobile: mobile });
      userDetails=await userService.login(mobile,password)
      if(userDetails===USER_NOT_FOUND_ERR){
        return res.json(createError(203,"USER_NOT_FOUND"))
      }
      if (userDetails===null || userDetails==="PASSWORD_NOT_MATCHED") {
        
        return res.status(401).json({ message: "Password not matched" });
        //const isMatch = await bcryptJs.compare(password, user.password);
        // if (isMatch) {
        //   const tokens = jwt.sign(
        //     { user: user._id },
        //     process.env.JWT_SECRET_KEY,
        //     {
        //       expiresIn: "10d",
        //     }
        //   );
          
          // const classBoardUser = await ClassBoardUser.findOne({userId:user._id}).populate("classBoardMapId");
          // if(classBoardUser===null){
          //   return res
          //   .status(200)
          //   .json({ message: "Login successfully", user: user,tokens:tokens,classBoardUser});
          // }
          // const classBoard=await ClassBoardMap.findById({_id:classBoardUser.classBoardMapId._id.toString()}).populate("classId").populate("boardId")
      
          // return res
          //   .status(200)
          //   .json({ message: "Login successfully", user: user,tokens:tokens,classBoardUser,classBoard});
         } else {
        //   return res.status(401).json({ message: "Password not matched" });
        // }
      
        //return res.status(404).json({ message: "User not found " });
        return res.status(200).json({message:"Login success"});
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: INTERNAL_SERVER_ERROR });
  }
};

const Signup = async (req, res) => {
  console.log("hd")
  if (req.body === "undefined") {
    return res.status(304).json({ message: "Body is empty!" });
  }
  try {
    const {
      mobile,
      password,
      firstName,
      lastName,
      email,
 
    } = req.body;
    if (mobile && password === "") {
      return res.status(304).json({ message: "Email or password empty" });
    } else {
      const isUser = await User.findOne({ mobile });
      if (isUser) {
        return res.status(409).json({ message: "User already exists. Please SignIn" });
      } else {
        const hashPassword = await bcryptJs.hash(password, 10);

        const newUser = await User({ mobile, password: hashPassword });
        if (newUser) {
          const isSaved = await newUser.save();
          if (isSaved) {
            const newProfile = new Profile({
              firstName,
              lastName,
              userId: isSaved._id,
              email:email,
            });
            if (await newProfile.save()) {
              const tokens = jwt.sign(
                { user: isSaved._id },
                process.env.JWT_SECRET_KEY,
                {
                  expiresIn: "10d",
                }
              );
              res.set("token",tokens)
             // await User.findOneAndUpdate({_id:isSaved._id},{token:tokens},{new :true});
              return res
                .status(200)
                .json({
                  message: "Successfully created new account",
                  user: newProfile,token:tokens
                });
            } else {
              return res
                .status(400)
                .json({ message: "Error while processing data" });
            }
          }
        }
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: INTERNAL_SERVER_ERROR });
  }
};

const Logout = (req, res) => {
  res.clearCookie({
    sameSite: "none",
    secure: true,
  });
  removeLocalStorage("user").status(201).send("user has been logout");
};

module.exports = {userController,  Logout, Signup };
