const express = require('express');
const userRoutes = require('./user');
const customerRoutes = require('./customer');
const connectDatabase = require('../middleware/connectDB');
const router = express.Router();

// Apply the connectDatabase middleware to all routes in this file
router.use(connectDatabase);

router.use('/user',userRoutes)

// Mount customer routes under /customer endpoint
router.use('/customer', customerRoutes);

module.exports = router;