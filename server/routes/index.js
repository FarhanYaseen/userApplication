const express = require('express')
const router = express.Router()

const { signUp, signIn, getAllUsers, getUser, deleteUser, updateUser } = require('../controllers/user')

const { validateSignIn, validateSignUp, validateUpdate, checkDuplicateEmail, verifyToken } = require('../middleware/index')


router.post('/signup',
  validateSignUp,
  checkDuplicateEmail,
  signUp
);

router.post('/signin', validateSignIn, signIn);

router.get('/users', verifyToken, getAllUsers);

// router.delete('/users', verifyToken, getAllUsers);

router.get('/users/:id', verifyToken, getUser);
router.put('/users/:id', verifyToken, validateUpdate, updateUser);
router.delete('/users/:id', verifyToken, deleteUser);


module.exports = router
