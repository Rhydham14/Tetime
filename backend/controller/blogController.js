const blogService = require('../service/blogService');
const blogController ={
    writeblog: async(req,res)=>{
       try{
        const {title, discrpition} = req.body;
        const writeblog = await blogService.writeblog({title, discrpition});
        res.status(201).json({message: "Blog added", writeblog})
       }catch(e){
        res.status(500).json({message:"somthing error"});
       }
    }
}

module.exports = blogController;