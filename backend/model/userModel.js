const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    fname:{type: String, required: true},
    lname:{type: String, required: true},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    contact:{type: Number, required: true},
    dob:{type:Date, require:true},
    country:{type: String, required: true},
    state:{type: String, required: true},
})


const userModel = mongoose.model("User", userSchema);
module.exports = userModel;