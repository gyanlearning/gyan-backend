const { EMPTY_BODY,INTERNAL_SERVER_ERROR } = require("../utils/error")
const Sessions=require("../model/session_model")
const AddNewSession=async(req,res)=>{

    try {
       if(req.body==null) {
        return res.status(203).json({message:EMPTY_BODY})
        
       }else{
        const newSession=new Sessions({
            startSession:req.body.startSession,
            endSession:req.body.endSession,
            createdAt:Date.now(), 
        })
        await newSession.save();
        res.status(200).json({message:"New session is added successfully"})
            
       }
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:INTERNAL_SERVER_ERROR})
    }

}

const GetSession=async(req,res)=>{
try {
    const session=await Sessions.find();
   return res.status(200).json({session:session});

} catch (error) {
    return res.status(500).json({message:INTERNAL_SERVER_ERROR,error:error})
}
}

module.exports={AddNewSession,GetSession};