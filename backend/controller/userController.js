const userService = require('../service/userService');
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
      }catch(e){
        console.log("error",e);
        res.status(500).json({ error: 'Internal server error' });
      }
    }
   
  };
  
  module.exports = UserController;
  