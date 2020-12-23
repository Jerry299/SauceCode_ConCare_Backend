const jwt = require("jsonwebtoken");
const { secretOrKey } = require("../config/config");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, secretOrKey);
    const { userId } = decodedToken;
    if (req.body.userId && req.body.userId !== userId) {
      return res.status(401).json({
        error: "Invalid User Id",
      });
    }

    return next();
  } catch (err) {
    res.status(401).json({
      error: new Error("Invalid Request"),
    });
  }
};
