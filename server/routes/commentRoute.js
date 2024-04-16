
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


//post a comment under a postv
router.post('/', async (req, res) => { 
    try{
        const {comment_text, post_id,  user_id} = req.body;
        const newComment = await pool.query('INSERT INTO comment (comment_text,post_id,  user_id) VALUES ($1, $2, $3) RETURNING *', 
        [comment_text, post_id,  user_id]
        );
        res.status(200).json(newComment.rows[0]);
      }catch(error){
          res.statusMessage(error);
          res.status(500).json({error: error});
      }
    });


// GET comments
router.get('/', async (req, res) => {
    try {
    const comments = await pool.query('SELECT * FROM comment');
    res.status(200).json(comments.rows);
        } catch (error) {
           console.log(error);
            res.status(500).json({ message: 'Failed to fetch comments' });
    } 
});
    
    module.exports = router;