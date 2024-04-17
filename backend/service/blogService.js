const { readblog } = require("../controller/blogController");
const Blog = require("../model/blogModel");
const usercontroller = require("../controller/userController");
const userModel = require("../model/userModel");

const blogService = {
  writeblog: async (blogData) => {
    try {
      const writeblog = await Blog.create({
        title: blogData.title,
        discription: blogData.discription,
        user_id: blogData.user_id
      });
      return blogData;
    } catch (e) {
      return e; 
    }
  },
  readblog: async () => {
    try {
      const readblog = await Blog.find({}, "title discription");
      // console.log(readblog);
      return readblog;
    } catch (error) {
      return error;
    }
  },
  userblog: async (user_id) => {
    try {
      const userBlogs = await Blog.find({ user_id }).select("title discription");
      return userBlogs;
    } catch (error) {
      throw error;
    }
  },
  blogread: async (_id)=>{
    try{
      const blogread = await Blog.findById({_id}).select("title discription");
      return blogread;
    }catch(error){  
      throw error;
    }
  }
};

module.exports = blogService;
