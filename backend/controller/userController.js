const userService = require("../service/userService");
const jwt = require("jsonwebtoken");
const jwtSecretKey = "your_secret_key_here";

const UserController = {
  register: async (req, res) => {
    try {
      const { fname, lname, email, password, contact, dob, country, state } =
        req.body;
      console.log("User data:", email, password);
      const userData = await userService.register({
        fname,
        lname,
        email,
        password,
        contact,
        dob,
        country,
        state,
      });
      res.status(201).json({ message: "User registered successfully", userData });
    } catch (error) {
      console.log("Error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const userData = await userService.login({ email, password });

      if (userData.success) {
        const {fname, user_id } = userData;

        const token = jwt.sign({ fname, user_id }, jwtSecretKey, { expiresIn: "20s" });

        res.status(200).json({
          success: true,
          message: userData.message,
          fname: userData.fname,
          token,
          user_id: userData.user_id,
        });
      } else {
        const { message } = userData;
        res.status(401).json({ success: false, message });
      }
    } catch (error) {
      console.log("Error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
};

module.exports = UserController;
