const mongoose = require("mongoose");
const blogSchema = new mongoose.Schema({
  title: { type: String, require: true },
  discription: { type: String, require: true },
  date: {
    type: Date,
    default: Date.now,
  },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  filename: String,
  contentType: String,
  file: Buffer 
});

const blogModel = mongoose.model("Blogg", blogSchema);
module.exports = blogModel;
