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

//send report
router.post('/', async (req, res) => { 
    try{
        const {report_text, reason_choice,  user_id} = req.body;
        const newReport = await pool.query('INSERT INTO reports (report_text, reason_choice,  user_id) VALUES ($1, $2, $3) RETURNING *', 
        [report_text, reason_choice,  user_id]
        );
      }catch(error){
          res.statusMessage(error);
          res.status(500).json({error: error});
      }
    });