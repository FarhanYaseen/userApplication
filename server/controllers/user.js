const jwt = require("jsonwebtoken");
const { secret } = require('../config/auth')
const bcrypt = require("bcrypt");
const saltRounds = 10;
const { STATUS_CODES } = require('../constants')
const { User } = require('../database/models');

const handleInternalServerError = (res) => res
  .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
  .json({
    message: "INTERNAL SERVER ERROR"
  });

const handleNoUserFound = (res) => res
  .status(STATUS_CODES.NOT_FOUND)
  .json({ message: "No User found" });

const handleSuccess = (res) => res
  .status(STATUS_CODES.OK)
  .json({
    success: true,
  });

const signUp = async (req, res) => {
  try {
    const { password, ...otherParams } = req.body;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const userData = { password: hashedPassword, ...otherParams };
    const user = await User.create(userData);
    var token = jwt.sign({ id: user.id }, secret, {
      expiresIn: 86400 // 24 hours
    });
    return res.status(STATUS_CODES.CREATED).json({
      user,
      accessToken: token
    });
  }
  catch (err) {
    return handleInternalServerError(res);
  }
}

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      where: {
        email,
      }
    });
    if (!user)
      return handleNoUserFound(res);

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(STATUS_CODES.UNAUTHORIZED).json({
        message: "Invalid Password!"
      });
    }
    var token = jwt.sign({ id: user.id }, secret, {
      expiresIn: 86400 // 24 hours
    });

    res.status(STATUS_CODES.OK).json({
      user,
      accessToken: token
    });
  }
  catch (err) {
    return handleInternalServerError(res);
  }
}

const getAllUsers = async (req, res) => {
  const users = await User.findAll();
  return res.status(STATUS_CODES.OK).json(users);
};

const getUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findOne({
    where: {
      id: parseInt(id),
    }
  });
  if (!user)
    return handleNoUserFound(res);

  return res.status(STATUS_CODES.OK).json(user);

};


const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({
      where: {
        id: parseInt(id),
      }
    });
    if (!user)
      return handleNoUserFound(res);
    user.destroy()
    return handleSuccess(res);
  } catch (err) {
    return handleInternalServerError(res);
  }

};

const updateUser = async (req, res) => {
  const { password = '', ...otherRequestBody } = req.body;
  const { id } = req.params;
  try {
    const user = await User.findOne({
      where: {
        id: parseInt(id),
      }
    });
    if (!user)
      return handleNoUserFound(res);

    const userData = {
      ...user.dataValues,
      ...otherRequestBody
    }
    if (password) {
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      userData.password = hashedPassword;
    }
    await user.update(userData)
    return res.status(STATUS_CODES.OK).json({
      success: true,
    });
  } catch (err) {
    const { name = "" } = err;
    if (name === "SequelizeUniqueConstraintError")
      return res
        .status(STATUS_CODES.CONFLICT)
        .json({
          message: "Email is already registered"
        });

    return handleInternalServerError(res);
  }
};

module.exports = {
  signUp,
  signIn,
  getAllUsers,
  getUser,
  deleteUser,
  updateUser
}