const blogService = require('../service/blogService');
const blogController ={
    writeblog: async(req,res)=>{
       try{
        const {title, discription} = req.body;
        const writeblog = await blogService.writeblog({title, discription});
        res.status(201).json({message: "Blog added", writeblog})
       }catch(e){
        res.status(500).json({message:"somthing error"});
       }
    },
    readblog: async(req,res)=>{
        try{
            const readblog = await blogService.readblog();
            console.log("*****************",readblog);
            res.status(201).json(readblog);
        }catch(error){
            res.status(500).json(error,"Failed");
        }
    }
}

module.exports = blogController;