const jwt = require("jsonwebtoken");
const { AUTh_TOKEN_GENERATE_FALE } = require("../../../utils/error");

const setLocalStorage = (key, value) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(value));
  }
};
//remove from localstoreage
const removeLocalStorage = (key) => {
  if (window !== "undefined") {
    localStorage.removeItem(key);
  }
};
const jwtService = {};

jwtService.authenticate = (req, res, next) => {
  const bearerHeader = req.headers.authorization;
  
  try {
   if(typeof bearerToken !==undefined ){
       const bearer=bearerHeader.split(' ');
       const bearerToken=bearer[0];

   
  // if (!tokens) {
  //   return res.status(401).json({ error: "Unauthorized" });
  // }

  
    jwt.verify(bearerToken, process.env.JWT_SECRET_KEY, function (err, data) {
      if (err) {
        //console.log(typeof err.message);
        return err.message;
      }
      req.user = data;
    });

    next();
  }
  } catch (err) {
    return res.status(401).json({ error: "Invalid token", err });
  }
};

const isAuth = () => {
  if (cookieChecked) {
    if (localStorage.getItem("user")) {
      return JSON.parse(localStorage.getItem("user"));
    } else {
      return false;
    }
  }
};

jwtService.jwtSignToken = async (userId) => {
  
  let tokens = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
    expiresIn: "3s",
  });
  
  if(tokens===null || tokens ===undefined){
    return AUTh_TOKEN_GENERATE_FALE;
  }
  return tokens;
};

module.exports = { jwtService, isAuth, setLocalStorage, removeLocalStorage };
