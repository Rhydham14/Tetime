const User = require("../model/userModel");
const userService = {
  register: async (userData) => {
    try {
      const exsitUser = await User.create({
        fname: userData.fname,
        lname: userData.lname,
        email: userData.email,
        password: userData.password,
        contact: userData.contact,
        dob: userData.dob,
        country: userData.country,
        state: userData.state
      });
      console.log("present user", exsitUser);

      console.log("......", userData);
      return userData;
    } catch (e) {
      return e;
    }
  },
  login: async (userData) =>{
    try{
      const user = await User.findOne(userData);
      if(user){
        
        return { success: true, message: 'Login successful', fname: user.fname, user_id: user._id };
      } 
      else{
        return { success: true, message: 'Login fail'};
      }
    }catch(e){
      return e ;
    }
  }
};

module.exports = userService; 