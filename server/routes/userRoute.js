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

// modify a user 
router.put('/:userId', async (req, res) => {
  const userId = req.params.userId;
  const { username, email } = req.body;

  try {
    const updateProfile = await pool.query(
      'UPDATE users SET username = $1, email = $2 WHERE id = $3 RETURNING *',
      [username, email, userId]
    );

    res.status(200).json(updateProfile.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to update post' });
  }
});

module.exports = router;
