const Profiles = require("../model/profile_model");
const User =require("../model/User_model")

const CreateProfile=async(req,res)=>{
    if(req.body==null){
        res.status(401).json({message})
    }
    

    try {
        const {firstName,lastName,address}=req.body;
        const newProfile=new Profiles({
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            Address:req.body.Address
        })
        if(await newProfile.save()){
            await User.up
            res.status(200).json({message:"Profile is updated successfully"})
            
            return;
        }
        res.status(500).json({message:"Internal server error"})
    } catch (error) {
       res.status(201) .json({error})
    }
}

module.exports=CreateProfile