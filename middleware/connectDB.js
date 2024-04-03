require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: 5432,
    max: 20,
    idleTimeoutMillis: 30000,
});

const connectDatabase = async (req, res, next) => {
    try {
        const client = await pool.connect();
        req.dbClient = client; 
        next();
    } catch (error) {
        console.error('Error connecting to database:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = connectDatabase;