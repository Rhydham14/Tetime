const express = require('express');
const router = express.Router();
const UserController = require('../controller/userController.js');

// Route for user registration
router.get('/register', (req,res)=>{
    res.render('register');
})
router.post('/register', UserController.register);
// Route for user login
// router.get('/login', UserController.login);

module.exports = router;
