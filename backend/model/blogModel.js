const mongoose = require('mongoose');
const blogSchema = new mongoose.Schema({
    // email:{type:String},
    title:{type: String, require:true},
    discription:{type:String, require:true}

})

const blogModel = mongoose.model("Blog", blogSchema);
module.exports = blogModel;