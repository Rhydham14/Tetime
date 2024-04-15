const jwt = require('jsonwebtoken');
const jwtSecretKey = 'your_secret_key_here'

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authorization token not provided' });
  }

  const token = authHeader.split(' ')[1]; // Extract the token part from the Authorization header

  try {
    const decoded = jwt.verify(token, jwtSecretKey);

    // Attach decoded user information to the request object for further use in subsequent middleware or routes
    req.user = decoded.user;
    next(); // Move to the next middleware or route handler
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired' });
    }
    return res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = { auth };
