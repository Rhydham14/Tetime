const mongoose = require("mongoose");
const blogSchema = new mongoose.Schema({
  title: { type: String, require: true },
  discription: { type: String, require: true },
  date: {
    type: Date,
    default: Date.now,
  },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  filename: { type: String, required: true },
  path: { type: String, required: true },

});

const blogModel = mongoose.model("Blog", blogSchema);
module.exports = blogModel;
