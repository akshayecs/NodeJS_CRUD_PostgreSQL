require('dotenv').config();
const jwt = require('jsonwebtoken');
const connectDB = require('../middleware/connectDB')

const verifyTokenAndRole = (req, res, next) => {
    console.log("Coming");
    const token = req.headers['authorization'];
    // Ensure the token starts with 'Bearer ' and then extract the token value
    if (!token || !token.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized: Token Not Found' });
    }
    
    // Check if token is provided
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: Token Not Found' });
    }
    // Decode the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET, { algorithms: ['RS256'] }); // Assuming RS256

    // Validate claims (optional)
    if (decoded.exp < Date.now() / 1000) { // Check for expiration
      throw new Error('Token has expired');
    }
    // Check if user has required role
    if (decoded.role === 'Manager') {
        req.body.is_authorized = true; // Set is_authorized to true if role is Manager
    } else {
        req.body.is_authorized = false; // Set is_authorized to false for other roles
    }
    next();
};




module.exports = verifyTokenAndRole;