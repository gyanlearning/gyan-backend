const mongoose=require("mongoose");

const profileSchema=mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    Address: { type: String, required: true },
    profileAvatar: { type: String, },
    createdAt:Date,
    
},

{timestamps:true}
)
module.exports=mongoose.model("Profiles",profileSchema)