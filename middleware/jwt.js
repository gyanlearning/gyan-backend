const jwt = require("jsonwebtoken");

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
const  authenticate=(req, res, next)=> {
  const tokens = req.cookies.token;

  if (!tokens) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
     jwt.verify(
      tokens,
      process.env.JWT_SECRET_KEY,
      function (err,data) {
        if (err) {
          console.log(typeof err.message);
          return err.message;
        }
        req.user = data;
      }
    );
    
    

    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token", err });
  }
}

const isAuth = () => {
  
    
    if (cookieChecked) {
      if (localStorage.getItem("user")) {
        return JSON.parse(localStorage.getItem("user"));
      } else {
        return false;
      }
    }
  
};

module.exports = { authenticate, isAuth,setLocalStorage,removeLocalStorage };
