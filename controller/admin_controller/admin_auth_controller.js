const Admin=require("../../model/amdmin_model/admin_model");
const adminLogin=async(req,res)=>{
    try {
        const {email,password}=req.body;
        const isAdmin=await Admin.findOne({email:email,password:password});
        if(isAdmin){
            return res.status(200).json({message:"Admin login successfully",admin:isAdmin});
        }else{
            return res.status(401).json({message:"email and password not found "});

        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"INTERNAL_SERVER_ERROR"});
    }
}
module.exports=adminLogin;