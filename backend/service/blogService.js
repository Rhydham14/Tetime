const Blog = require('../model/blogModel');

const blogService ={
    writeblog: async(blogData)=>{
        try{
            const writeblog = await Blog.create({
                title:blogData.title,
                discription: blogData.discription
            });
            return blogData;
        }catch (e){
                return e ; 
        }
    }
}

module.exports = blogService;