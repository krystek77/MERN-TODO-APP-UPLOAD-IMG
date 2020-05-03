const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
//User controller
const UserController = require('../controllers/user');

// @route 	POST users
// @desc 	Register new user
// @access 	Public
router.get('/', UserController.getAllUsers);
// @route 	POST users/signup
// @desc 	Register new user
// @access 	Public

router.post('/signup', UserController.signUp);

// @route 	POST users/signin
// @desc 	Login user
// @access 	Public

router.post('/signin', UserController.signIn);

// @route 	GET users/signin/user
// @desc 	GET user data
// @access 	Private

router.get('/signin/user', auth, UserController.getAuthUser);

module.exports = router;
