// const { readblog } = require("../controller/blogController");
const Blogg = require("../model/blogModel");
// const usercontroller = require("../controller/userController");
// const userModel = require("../model/userModel");

const blogService = {
  writeblog: async (blogData, file) => {
    try {
      const { title, discription, user_id } = blogData;

      // Check if image object and its properties are defined

      // Create a new blog document
      const newBlog = await Blogg.create({
        title,
        discription,
        user_id,
        filename: file.originalname,
        contentType: file.mimetype,
        file: file.buffer, // Store the file data directly in the 'file' field
      });

      // console.log("Blog created:", newBlog);
      return newBlog;
    } catch (error) {
      console.error("Error creating blog:", error);
      throw error;
    }
  },

  readblog: async () => {
    try {
      // Query all blog documents from the database
      const blogData = await Blogg.find({});

      // Map over each blog document to format and include image data
      const blogsWithImageData = blogData.map((blog) => {
        return {
          _id: blog._id,
          title: blog.title,
          discription: blog.discription,
          user_id: blog.user_id,
          filename: blog.filename,
          contentType: blog.contentType,
          // Convert binary image data to Base64 string
          imageData: blog.file.toString("base64"),
          date: blog.date,
          // __v: blog.__v,
        };
      });

      return blogsWithImageData;
    } catch (error) {
      console.error("Error fetching blog data:", error);
      throw error;
    }
  },
  userblog: async (user_id) => {
    try {
      const userBlogs = await Blogg.find({ user_id }).select(
        "title discription"
      );
      return userBlogs;
    } catch (error) {
      throw error;
    }
  },
  blogread: async (_id)=>{
    try{
      const blogread = await Blogg.findById({_id}).select("title discription");
      return blogread;
    }catch(error){  
      throw error;
    }
  },
  deleteblog: async (_id) => {
    try {
      const deleteblog = await Blogg.findByIdAndDelete({ _id });
      return deleteblog;
    } catch (error) {
      throw error;
    }
  },
  updateblog: async (updateblog) => {
    try {
      console.log("aaaaaaaaa", updateblog);
      const _id = updateblog._id;
      const updatedblog = await Blogg.findByIdAndUpdate(
        { _id },
        {
          title: updateblog.title,
          discription: updateblog.discription,
        }
      );
      return updatedblog;
    } catch (error) {
      return error;
    }
  },
};

module.exports = blogService;
