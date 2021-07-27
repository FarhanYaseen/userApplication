const { User } = require("../database/models");
const { STATUS_CODES } = require('../constants');

const checkDuplicateEmail = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({
      where: {
        email,
      }
    });
    if (user) {
      return res.status(STATUS_CODES.BAD_REQUEST).json({
        message: "Failed! Email is already in use!"
      });
    }
    return next();
  } catch (err) {
    return next();
  }
};

module.exports = {
  checkDuplicateEmail,
}