const mongoose = require('mongoose');
const blogSchema = new mongoose.Schema({
    email:{type:String},
    title:{type: String, require:true},
    discrpition:{type:String, require:true}

})

const blogModel = mongoose.model("Blog", blogSchema);
module.exports = blogModel;