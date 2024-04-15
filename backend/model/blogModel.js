const mongoose = require("mongoose");
const blogSchema = new mongoose.Schema({
  title: { type: String, require: true },
  discription: { type: String, require: true },
  date: {
    type: Date,
    default: Date.now,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'userModel' // Specify the name of the referenced model (User)
  }
});

const blogModel = mongoose.model("Blog", blogSchema);
module.exports = blogModel;
