const jwt = require("jsonwebtoken");
const jwtSecretKey = "rhydhmroll";

const auth = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  console.log("rocke and roll",token);
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Access token is missing" });
  }

  try {
    console.log("rocke and roll");
    
    const decoded = jwt.verify(token, jwtSecretKey);
console.log("decoded",decoded);
    req.userData = decoded;

    next();
  } catch (error) {
    console.log("erorrrrrrr",error);
    if (error.name === "TokenExpiredError") {
      console.log("419 419 419 419 419 419 419");
      return res.status(419).json({ success: false, message: "Token expired" });
    } else {
      return res
        .status(401)
        .json({ success: false, message: "Invalid access token" });
    }
  }
};

module.exports = auth;
