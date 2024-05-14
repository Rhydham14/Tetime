const express = require("express");
const cors = require("cors");
const userRoutes = require("../backend/routes/userRoutes.js");
const blogRoutes = require("../backend/routes/userRoutes.js");
const PORT = process.env.PORT || 8080;

const app = express();
require("dotenv").config();

// const allowedOrigins = [
//   "https://tetime-q22048yek-rhydham14s-projects.vercel.app",
//   "https://tetime.vercel.app",
//   "http://localhost:3000"  
// ];

app.use(express.json());
app.use(cors({
  origin: [
    "tetime-nto5ashu6-rhydham14s-projects.vercel.app/", 
    "https://tetime-q22048yek-rhydham14s-projects.vercel.app",
    "https://tetime-q22048yek-rhydham14s-projects.vercel.app/",
    "tetime-nto5ashu6-rhydham14s-projects.vercel.app/",
    "tetime-nto5ashu6-rhydham14s-projects.vercel.app",
    "tetime-git-blogging-rhydham14s-projects.vercel.app",
    "tetime-git-blogging-rhydham14s-projects.vercel.app/",
    "https://tetime.vercel.app",
    "https://tetime.vercel.app/",
    "https://tetime-git-blogging-rhydham14s-projects.vercel.app",
    "https://tetime-git-blogging-rhydham14s-projects.vercel.app/",
    "http://localhost:3000",
    "http://localhost:3000/"
  ]
  // methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  // allowedHeaders: "Content-Type,Authorization"
}));

app.use("/api/users", userRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/",(req,res)=>{
  res.send("temp api");
})

// Handle CORS preflight OPTIONS requests
// app.options("*", cors());

app.listen(PORT, () => {
  console.log(`Server connected:${PORT}`);
});
