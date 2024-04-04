const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { Pool } = require('pg');
const jwt = require('jsonwebtoken');


// Registration route
router.post('/register', async (req, res) => {
    const {dbClient} = req;
    try {
        const { username, email, password, role } = req.body;

        const {rows:userExist} = await dbClient.query(
            `select * from users where username = $1 OR email = $2`,[username, email]
        );

        if (userExist.length > 0) {
            return res.status(400).json({ message: 'Username or email already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
    
        const userData = await dbClient.query(
            `INSERT INTO users(username, email, password,role) VALUES($1,$2,$3,$4) RETURNING *`,
            [username, email, hashedPassword,role]
        );

        return res.status(200).json({ message: 'User registered successfully', user: userData.rows });
    } catch (error) {
        // client.release()
        return res.status(500).json({ message: 'Internal Server Error' });
    } 
    finally{
        dbClient.release();
    }
});

router.get('/login', async (req, res) => {
    const {dbClient} = req;
    try {
        const { email, password } = req.body;

        const {rows:userExist} = await dbClient.query(
            `SELECT * FROM users WHERE email = $1`,[email]
        );

        if (userExist.length === 0) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        const user = userExist[0];
        
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign({ 
            user_id: user.user_id, 
            username: user.username, 
            email: user.email, 
            role: user.role 
        }, process.env.JWT_SECRET, { expiresIn: '1h' });
        
        return res.status(200).json({ token });
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' });
    } 
    finally{
        dbClient.release();
    }
});
module.exports = router;