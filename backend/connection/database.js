const mongoose = require('mongoose');
const uri = 'mongodb+srv://rhydhambhalodia:CT42je0mke40VirR@cluster0.iychvgy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(uri)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('Error connecting to MongoDB Atlas:', err));
