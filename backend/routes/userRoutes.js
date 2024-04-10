const express = require('express');
const router = express.Router();
const UserController = require('../controller/userController.js');
const blogController = require('../controller/blogController');

// Route for user registration
router.post('/login', UserController.login);

router.post('/register', UserController.register);

router.post('/writeblog', blogController.writeblog);


module.exports = router;

