
const  verifyToken=(token) =>{
  try {
    return jwt.verify(token,"Gauravkumar" );
  } catch (err) {
    return false;
  }
}
// const verifyToken=(req,res,next)=>{
//     const token=req.cookies.accessToken;
//     console.log(req.cookie.accessToken)
//     console.log("jdkdl")
//     if(!token)  return  next(401,"You are not authenticated")
//     jwt.verify(token,"Gauravkumar",async (err,payload)=>{
//         if(err) return next(403,"Token in valid")
//         req.userId=payload.id;
        
//         next();
//       }) 
// }

module.exports=verifyToken