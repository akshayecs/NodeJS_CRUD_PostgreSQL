require('dotenv').config();
const jwt = require('jsonwebtoken');


const verifyTokenAndRole = (req, res, next) => {
    const authHeader = req.headers["authorization"];
  
    //Extracting token from authorization header
    const token = authHeader && authHeader.split(" ")[1];
  
    //Checking if the token is null
    if (!token) {
      return res.status(401).send("Authorization failed. No Token Found.");
    }
  
    if (!req.userInfo) {
        req.userInfo = {};
    }
    //Verifying if the token is valid.
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        console.log(err);
        return res.status(403).send("Could not verify token");
      }
        req.userInfo = user;
    });
    next();
  };

module.exports = verifyTokenAndRole;