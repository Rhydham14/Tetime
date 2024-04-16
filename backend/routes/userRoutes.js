const express = require('express');
const router = express.Router();
const UserController = require('../controller/userController.js');
const blogController = require('../controller/blogController');
const { auth } = require('../middleware/auth.js');

// Route for user registration
router.post('/login', UserController.login);

router.post('/register', UserController.register);

router.post('/writeblog', blogController.writeblog);

router.get('/readblog', blogController.readblog);

router.get('/userblog', blogController.userblog);

module.exports = router;    
