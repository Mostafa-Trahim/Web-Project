const express = require('express');


const router = express.Router();
const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'project',
  password: '12301230456',
  port: 5432,
});

router.get('/test', (req, res) => {
  res.status(200).send('Test route');
  console.log('Test route');
});

router.post('/test', (req, res) => {
  res.status(200).send('Test route');
  console.log('Test route');
});

router.put('/test', (req, res) => {
  res.status(200).send('Test route');
  console.log('Test route');
});

router.delete('/test', (req, res) => {
  res.status(200).send('Test route');
  console.log('Test route');
});

module.exports = router;