const express = require("express");
const router = express.Router();
const UserController = require("../controller/userController.js");
const blogController = require("../controller/blogController");
const auth  = require("../middleware/auth.js");
const upload = require("../middleware/multer.js");

// Route for user registration
router.post("/login", UserController.login);

router.post("/register", UserController.register);

router.post("/writeblog", upload.single("file"), blogController.writeblog);

router.get("/readblog", auth, blogController.readblog);

router.get("/userblog", blogController.userblog);

router.get("/blogread", blogController.blogread);

router.delete("/deleteblog", blogController.deleteblog);

router.patch("/updateblog", blogController.updateblog);

router.get("/refreshToken", UserController.refreshToken);

module.exports = router;
