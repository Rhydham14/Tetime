const userService = require('../service/userService');
const jwt = require('jsonwebtoken');
const jwtSecretKey = 'your_secret_key_here';

const UserController = {
    register: async(req, res) => {
      try{
        const {fname, lname, email, password, contact, dob, country, state} = req.body;
        console.log("USer data",email, password);
      const userData = await userService.register({ fname, lname, email, password, contact, dob, country, state });
      res.status(201).json({ message: 'User registered successfully', userData });

      }catch(e){
        console.log("error",e);
        res.status(500).json({ error: 'Internal server error' });
      }
    },
    login: async(req,res)=>{
      try{
        const {email, password}=req.body;
        console.log("email:",email);
        console.log("password:",password);

        const userData = await userService.login({email, password});
        if (userData.success) {
          // Login successful
          const { message, fname } = userData;
          res.status(200).json({ success: true, message, fname });
        } else {
          // Login failed
          const { message } = userData;
          res.status(401).json({ success: false, message });
        }
        //Creating jwt token here and passing tokon to client  side 
        const token = jwt.sign(userData,jwtSecretKey,{ expiresIn: '1m' });
        res.json({token});
      }catch(e){
        console.log("error",e);
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  };
  
  module.exports = UserController;
  