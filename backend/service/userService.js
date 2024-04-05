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
};

module.exports = userService;
