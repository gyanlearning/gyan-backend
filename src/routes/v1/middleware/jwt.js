const jwt = require("jsonwebtoken");
const { AUTh_TOKEN_GENERATE_FALE } = require("../../../utils/error");
const config = require("../../../config");
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

jwtService.authenticate = async (req, res, next) => {
  const bearerHeader = req.headers.authorization;

  if (typeof bearerToken !== undefined) {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];

    // if (!tokens) {
    //   return res.status(401).json({ error: "Unauthorized" });
    // }

    return jwt.verify(
      bearerToken,
      config.seceret_code,
      function (err, decoded) {
        if (err) {
          return res.status(403).json({
            success: false,
            message: "Failed to authenticate token.",
          });
        }
        req.user = decoded;
        return next();
      }
    );
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
  let tokens = jwt.sign({ userId }, config.seceret_code, {
    expiresIn: "3d",
  });

  if (tokens === null || tokens === undefined) {
    return AUTh_TOKEN_GENERATE_FALE;
  }
  return tokens;
};

module.exports = { jwtService, isAuth, setLocalStorage, removeLocalStorage };
