const { User } = require("../database/models");

const checkDuplicateEmail = async (req, res, next) => {
  // Email
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email
      }
    });
    if (user) {
      res.status(400).send({
        message: "Failed! Email is already in use!"
      });
      return;
    }
    return next();
  } catch (err) {
    return next();
  }
};

module.exports = {
  checkDuplicateEmail,
}