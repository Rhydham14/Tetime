const express = require("express");
// const bodyParser = require('body-parser');
const mongodb = require("../backend/connection/database");
const PORT = process.env.PORT || 8080;
const userRoutes = require("../backend/routes/userRoutes.js");
const UserController = require("../backend/controller/userController.js");
// const path = require("path");
const jwt = require("jsonwebtoken");
const secretKey = "your_secret_key_here";

const app = express();
require("dotenv").config();
const cors = require("cors");
const blogRoutes = require("../backend/routes/userRoutes.js");

// app.set('view engine', '.hbs');
// app.set("views", path.join(__dirname, "views"));


const allowedOrigins = [
  "https://tetime-q22048yek-rhydham14s-projects.vercel.app",
  "https://tetime-q22048yek-rhydham14s-projects.vercel.app/",
  "https://tetime.vercel.app/",
  "https://tetime.vercel.app",
  "http://localhost:3000",
  "http://localhost:3000/"
];
app.use(express.json());

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({ origin: allowedOrigins }));
app.use("/api/users", userRoutes);
app.use("/api/blogs", blogRoutes);


// app.use("/api/blogs", blogRoutes);

app.listen(PORT, () => {
  console.log("Server connected:", PORT);
});
