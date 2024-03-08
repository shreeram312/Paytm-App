const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("./config");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    res.status(403).json({
      msg: "No JWT",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log(decoded);
    if (decoded.userId) {
      req.userId = decoded.userId;
      console.log(req.userId);
      console.log("hi");
      next();
    } else {
      res.json({
        msg: "403 bro",
      });
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = authMiddleware;
