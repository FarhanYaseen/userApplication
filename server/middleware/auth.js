const jwt = require("jsonwebtoken");
const { secret } = require("../config/auth.js");
const { STATUS_CODES } = require('../constants');

const verifyToken = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res.status(STATUS_CODES.FORBIDDEN).json({ message: "A token is required for authentication" });
  }
  try {
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
  } catch (err) {
    return res.status(STATUS_CODES.UNAUTHORIZED).json({ message: "Invalid Token" });
  }
  return next();
};

const auth = {
  verifyToken,
};
module.exports = auth;