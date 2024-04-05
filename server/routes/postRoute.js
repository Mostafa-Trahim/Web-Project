require("dotenv").config();
const express = require('express');


const router = express.Router();
const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});



router.get('/',async (req, res) => {

  try {
    const posts = await pool.query('SELECT * FROM posts')
    const rows = posts.rows ? posts.rows : [];
    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch posts' });
  }
  
})

// Create a new post
router.post('/create', async (req, res) => {
  const { title, interest, url, user_id } = req.body;

  try {
    const newPost = await pool.query(
      'INSERT INTO posts (title, interest, url, user_id) VALUES ($1, $2, $3, $4) RETURNING *',
      [title, interest, url, user_id]
    );

    res.status(201).json(newPost.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create post' });
  }
});

module.exports = router;