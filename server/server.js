// import express from 'express';

const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const bodyParser = require('body-parser');
const app = express();
const port = 3000;

const postRoute = require('./routes/postRoute.js');
const authRoute = require('./routes/authRoute.js');
const commentRoute = require('./routes/commentRoute.js');
const userRoute = require('./routes/userRoute.js');

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/posts', postRoute);
app.use('/auth', authRoute); // i can change the route to "/"
app.use('/comments', commentRoute); 
app.use('/users', userRoute);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
 