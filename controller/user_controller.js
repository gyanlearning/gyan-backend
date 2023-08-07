const Profiles = require("../model/profile_model");
const User = require("../model/User_model");
const { SERVER_ERR } = require("../error");
const bson = require("bson");
const  jwt  = require("jsonwebtoken");
const CreateProfile = async (req, res) => {
  if (req.body == null) {
    res.status(401).json({ message });
  }
  try {
    const userId=req.user;
    const newProfile = new Profiles({

      firstName: req.body.firstName,
      lastName: req.body.lastName,
      userId:userId.user._id,
      address: [
        {
          village: req.body.village,
          district: req.body.district,
          pincode: req.body.pincode,
          state: req.body.state,
          country: req.body.country,
        },
      ],
    });
    if (await newProfile.save()) {
      await User.findOneAndUpdate;
      res.status(200).json({ message: "Profile is updated successfully" });

      return;
    }
    res.status(500).json({ message: "Internal server error" });
  } catch (error) {
    res.status(201).json({ error });
  }
};

// Controller for Get All User
const GetAllUser = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ users: users });
  } catch (err) {
    res.status(500).json({ message: SERVER_ERR });
  }
};

//Get Single User
const GetUser = async (req, res) => {
  try {
   
    if(req.user!=="undefined" && req.user!==""){
      const user=req.user;
      const currentUser=await Profiles.findOne({userId:user.user._id});
      
      res.status(200).json({ user:currentUser });
    }
    
    
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: SERVER_ERR });
  }
};

//Update profile
const UpdateProfile = async (req, res) => {
  try {
    await Profiles.findOneAndUpdate(
      { _id: req.params.id },
      {
        firstName: req.body.firstname,
        lastName: req.body.lastname,
        Address: req.body.address,
      },
      { new: true }
    );
    res.status(200).json({ message: "Profile updated" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: SERVER_ERR });
    return false;
  }
};

//Get Single User
const GetUserByName = async (req, res) => {
  try {
    console.log("sess");
    const users = await Profiles.findOne({ firstName: req.body.firstName });
    res.status(200).json({ users: users });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: SERVER_ERR });
  }
};
module.exports = {
  CreateProfile,
  GetAllUser,
  GetUser,
  UpdateProfile,
  GetUserByName,
};
