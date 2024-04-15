const mongoose = require('mongoose');
const blogSchema = new mongoose.Schema({
    title:{type: String, require:true},
    discription:{type:String, require:true},
    date: {
        type: Date,
        default: Date.now 
      },
      email:{type:String, require:true}

})

const blogModel = mongoose.model("Blog", blogSchema);
module.exports = blogModel;