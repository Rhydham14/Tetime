const { readblog } = require('../controller/blogController');
const Blog = require('../model/blogModel');
const usercontroller = require('../controller/userController');

const blogService ={
    writeblog: async(blogData)=>{
        try{
            const writeblog = await Blog.create({
                title:blogData.title,
                discription: blogData.discription,
                email:blogData.email
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