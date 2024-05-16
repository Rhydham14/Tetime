const Blogg = require("../model/blogModel");


const blogService = {
  writeblog: async (blogData, file) => {
    try {
      const { title, discription, user_id, imageUrl } = blogData;

      // Check if image object and its properties are defined

      // Create a new blog document
      const newBlog = await Blogg.create({
        title,  
        discription,
        user_id,
        imageUrl
      });

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
  
      // Map over each blog document to include image URL
      const blogsWithImageData = blogData.map((blog) => {
        return {
          _id: blog._id,
          title: blog.title,
          discription: blog.discription,
          user_id: blog.user_id,
          imageUrl: blog.imageUrl, // Retrieve imageUrl from blog document
          date: blog.date,
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

  blogread: async (_id) => {
    try {
      // Find the blog document by its _id
      const blog = await Blogg.findById(_id);
  
      if (!blog) {
        throw new Error("Blog not found");
      }
  
      // Return the blog data object with imageUrl
      return {
        _id: blog._id,
        title: blog.title,
        discription: blog.discription,
        user_id: blog.user_id,
        imageUrl: blog.imageUrl, // Retrieve imageUrl from blog document
        date: blog.date,
      };
    } catch (error) {
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
