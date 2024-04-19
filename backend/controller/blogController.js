const blogService = require("../service/blogService");
const crypto = require('crypto');

const blogController = {
  writeblog: async (req, res) => {
    try {
      const { title, discription, user_id} = req.body;
      const { filename, path } = req.file;
      const writeblog = await blogService.writeblog({ title, discription, filename, path, user_id });
      res.status(201).json({ message: "Blog added", writeblog });
    } catch (e) {
      res.status(500).json({ message: "Something went wrong", error: e.message });
    }
  },

  readblog: async (req, res) => {
    try {
      const readblog = await blogService.readblog();
      res.status(200).json(readblog);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch blogs", error: error.message });
    }
  },

  userblog: async (req, res) => {
    try {
      const { user_id } = req.query;
      const userBlogs = await blogService.userblog(user_id);
      res.status(200).json(userBlogs);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch user's blogs", error: error.message });
    }
  },
  blogread: async (req, res)=>{
    try{
      const {_id} = req.query;
      console.log("blogID backend", _id);
      const blogread = await blogService.blogread(_id);
      res.status(200).json(blogread);
    }catch(error){
      res.status(500).json({message:"Blogging error", error:error.message});
    }
  },
  deleteblog: async(req,res)=>{
    try{
      const {_id} = req.query;
      const deleteblog = await blogService.deleteblog(_id);
      res.status(200).json(deleteblog);
    }catch(error){
      res.status(500).json({message:"can't delete the blog",error:error.message})
    }
  },
  updateblog: async(req, res)=>{
    try{
      const {title, discription} = req.body;
      const {_id} = req.query;
      console.log("controller",discription);
      console.log("id", _id);
      const updateblog = await blogService.updateblog({_id, title, discription});
      res.status(200).json(updateblog);
      console.log("updated",updateblog);
    }catch(error){
      console.log(error);
      res.status(500).json({message:"not able to update", error:error.message});
    }
  }
};

module.exports = blogController;
