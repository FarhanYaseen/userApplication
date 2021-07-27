const jwt = require("jsonwebtoken");
const { secret } = require('../config/auth')
const bcrypt = require("bcrypt");
const saltRounds = 10;

const { User } = require('../database/models');

const signUp = async (req, res) => {

  try {
    const { password, ...otherParams } = req.body;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const userData = { password: hashedPassword, ...otherParams };
    const user = await User.create(userData);
    var token = jwt.sign({ id: user.id }, secret, {
      expiresIn: 86400 // 24 hours
    });
    return res.status(200).json({
      ...user.dataValues,
      accessToken: token
    });
  }
  catch (err) {
    console.log(err)
    return res.status(500).json(err);
  }
}

const signIn = async (req, res) => {

  const { email, password } = req.body;

  const user = await User.findOne({
    where: {
      email,
    }
  });

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.status(401).send({
      accessToken: null,
      message: "Invalid Password!"
    });
  }
  var token = jwt.sign({ id: user.id }, secret, {
    expiresIn: 86400 // 24 hours
  });

  const { id, firstName, lastName } = user;
  res.status(200).send({
    id,
    firstName,
    lastName,
    accessToken: token
  });
}

const getAllUsers = async (req, res) => {
  const users = await User.findAll();
  return res.status(200).send(users);
};

const getUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findOne({
    where: {
      id: parseInt(id),
    }
  });
  if (user)
    return res.status(200).send(user);

  return res.status(404).send("No User found");
};


const deleteUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findOne({
    where: {
      id: parseInt(id),
    }
  });
  if (!user) {
    return res.status(404).send("No User found");
  }
  user.destroy()
  return res.status(200).send("User has been deleted");

};

const updateUser = async (req, res) => {
  const { password = '', ...otherRequestBody } = req.body;
  const { id } = req.params;
  const user = await User.findOne({
    where: {
      id: parseInt(id),
    }
  });
  if (!user) {
    return res.status(404).send("No User found");
  }
  const userData = {
    ...user.dataValues,
    ...otherRequestBody
  }
  if (password) {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    userData.password = hashedPassword;
  }
  await user.update(userData)
  return res.status(200).send("User has been Updated");

};

module.exports = {
  signUp,
  signIn,
  getAllUsers,
  getUser,
  deleteUser,
  updateUser
}