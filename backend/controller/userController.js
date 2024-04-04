const userService = require('../service/userService');
const UserController = {
    register: async(req, res) => {
      try{
        const {email, password} = req.body;
        console.log("USer data",email, password);
      if (!email || !password) {
        return res.status(400).json({ error: 'Please provide email and password' });
      }
      const userData = await userService.register({ email, password });
      res.status(201).json({ message: 'User registered successfully', user: userData });

      }catch(e){
        console.log("error",e);
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  
   
  };
  
  module.exports = UserController;
  