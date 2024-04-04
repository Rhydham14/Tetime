
const User = require('../model/userModel');
const userService = {
  register: async (userData) => {
    try{
        const exsitUser = await User.create({
           
            email: userData.email,
            password: userData.password
          });
        console.log("present user",exsitUser);
        
        console.log("......",userData);
        return userData;
    }catch(e){
        throw e;
    }
  }
};

module.exports = userService;