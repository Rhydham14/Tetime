const { readblog } = require('../controller/blogController');
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
    },
    readblog: async()=>{
        try{
            const readblog =await Blog.find({}, 'title discription');
            // console.log(readblog);
            return readblog;
        }catch(error){
            return error;
        }
    }
}

module.exports = blogService;