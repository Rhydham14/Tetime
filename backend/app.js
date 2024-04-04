const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config();
const mongodb = require('../backend/connection/database'); 
const PORT = process.env.PORT || 4000;
const userRoutes = require('../backend/routes/userRoutes.js');
const UserController = require('../backend/controller/userController.js');
const path = require("path");


app.use(express.json());
app.set('view engine', '.hbs');
app.set("views", path.join(__dirname, "views"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/users', userRoutes);


app.listen(PORT, () => {
    console.log("Server connected:", PORT);
});
