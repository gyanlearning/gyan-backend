const jwt = require("jsonwebtoken");

function authenticate(req, res, next) {
  const tokens = req.headers.cookie;
  console.log(req.headers.cookie);

  if (!tokens) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(
      tokens,
      process.env.JWT_SECRET_KEY,
      function (err) {
        if (err) {
          console.log(typeof err.message);
          return err.message;
        }
      }
    );
    req.user = decoded;

    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token", err });
  }
}
module.exports = authenticate;