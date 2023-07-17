const jwt=require("jsonwebtoken")
function authenticate(req, res, next) {
  // Get the JWT token from the cookie
  const tokens = req.headers.cookie;
  console.log(req.headers.cookie)

  if (!tokens) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    // Verify the token
    console.log("he")
    const decoded = jwt.verify(tokens, process.env.JWT_SECRET_KEY,function(err){
      if(err) {
          console.log(typeof(err.message))
          return err.message
      }
      } )
   

    // Attach the decoded token to the request object for further use
    req.user = decoded;

    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token',err });
  }
}
module.exports=authenticate;
