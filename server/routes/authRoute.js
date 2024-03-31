require("dotenv").config();
const express = require('express');

const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    
    try {
    // Hash the password!
    const hashedPassword = await bcrypt.hash(password, 10);

    // console.log(hashedPassword);
    // Create a new user in the database
    const newUser = await pool.query(
        'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *',
        [username, email, hashedPassword]
    )
    console.log(newUser.rows[0])
    res.status(201).json({"message" :"User Created Successfully!" });

    } catch (error) {
        console.error(error.detail);
        res.status(500).json({ message: 'Failed to Create User!' });
     }

  });
  
  
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
    // Check if the user exists in the database
        const user = await pool.query(
            'SELECT * FROM users WHERE username = $1',
            [username]
        );
        if (!user) {
            return res.status(401).json({ message: 'Invalid Credentials!' });
        }
        //IF password is correct

        const isPasswordValid = await bcrypt.compare(password, user.rows[0].password);
        // console.log("isPasswordValid", isPasswordValid);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid Credentials!' });
        }

        // Generate cookie and send it to the user

        // res.setHeader("Set-Cookie", "test=" + "myValue").json("success");

        const age = 1000 * 60 * 60 * 24 * 7; // 1 week
        const JWT_SECRET= process.env.JWT_SECRET; // this is the secret key should be from .env but not working for now will fix it later
         
        // const token = jwt.sign({
        //     id: user.rows[0].id
        // },"inv2GR5tbECaULbI2VdtXQW0XZ9IF2o3+hMl0p6eGJA=",   // this is the secret key should be from .env but not working for now will fix it later
        // { expiresIn: age });
        const token = jwt.sign({
            id: user.rows[0].id
        }, "inv2GR5tbECaULbI2VdtXQW0XZ9IF2o3+hMl0p6eGJA=", { expiresIn: age });
        // console.log(token);        

        const { password: pass, ...userInfo } = user.rows[0];
       
        res.cookie("token4", token, {
            httpOnly: true,
            // secure: true,
            maxAge: age
        }).status(200).json( userInfo ); 
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to Login!' });
    } 
  });
  
router.post('/logout', (req, res) => {
    res.clearCookie('token').json({ message: 'Logged out!' });
  });

module.exports = router;