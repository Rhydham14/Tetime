const express = require ('express');
const router = express.Router();
const blogController = require('../controller/blogController');

// Route for user registration
router.post('/writeblog', blogController.writeblog);


module.exports = router;