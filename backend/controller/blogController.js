const blogService = require("../service/blogService");
// const crypto = require('crypto');
const redisClient = require('../middleware/redis');


const blogController = {
  // writeblog: async (req, res) => {
  //   try {
  //     const { title, discription, user_id } = req.body;
  //     if (!req.file) {
  //       return res.status(400).json({ error: "No image file uploaded" });
  //     }
  //     const imageUrl = req.file.path; // Cloudinary URL

  //     const writeblog = await blogService.writeblog({ title, discription, user_id,  imageUrl });

  //     res.status(201).json({ message: "Blog added", writeblog });
  //   } catch (e) {
  //     console.log("controller error", e);
  //     res.status(500).json({ message: "Something went wrong", error: e.message });
  //   }
  // },

  writeblog: async (req, res) => {
    try {
      const { title, discription, user_id } = req.body;
      if (!req.file) {
        return res.status(400).json({ error: "No image file uploaded" });
      }
      const imageUrl = req.file.path; // Cloudinary URL
  
      const writeblog = await blogService.writeblog({ title, discription, user_id, imageUrl });
  
      // Cache the new blog entry in Redis
      const blogCacheKey = `blog:${writeblog._id}`;
      // console.log("blogCacheKey>>>>>>>>>>", blogCacheKey);
      await redisClient.set(blogCacheKey, JSON.stringify(writeblog), 'EX', 36); // Cache for 36 sec
  
      // Invalidate the cache for all blogs
      await redisClient.del('allBlogs');
  
      res.status(201).json({ message: "Blog added", writeblog });
    } catch (e) {
      console.log("controller error", e);
      res.status(500).json({ message: "Something went wrong", error: e.message });
    }
  },
  
  
  readblog: async (req, res) => {
    try {
      const cacheKey = 'allBlogs';
      
      // Check if data is present in cache
      const cachedBlogs = await redisClient.get(cacheKey);
      
      if (cachedBlogs) {
        // If cache hit, parse and return the cached data
        // console.log("cachedblog", cachedBlogs);
        return res.status(200).json(JSON.parse(cachedBlogs));
      }
      
      // If cache miss, fetch from database
      const blogData = await blogService.readblog();
      
      // Store the fetched data in Redis cache
      await redisClient.set(cacheKey, JSON.stringify(blogData), 'EX', 3600); // Cache for 1 hour
      
      // Return the fetched data
      res.status(200).json(blogData);
    } catch (error) {
      console.error("Error fetching blog data:", error);
      res.status(500).json({ error: "Internal server error" });
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
