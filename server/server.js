const express = require('express');
const app = express();

const bodyparser = require("body-parser");
const { createToken } = require('./auth.js');
app.use(bodyparser.json());

app.get('/', (req, res) => {
    res.send('Hello World');
    });

    app.get('/profile',  (req, res) => {
        return res.status(401).json({ message: 'Unauthorized' });
    });

        app.listen(3000, () => {
            console.log('Server is running on port 3000');
        });

    app.post("/login", (req, res) => {
        
        const { username, password } = req.body;
        console.log(`${username} is trying to login`);
        
        if (username === 'john' && password === 'password') {
            return res.json({
                 token: createToken(username), 
        });
        }
        return res
        .status(401)
        .json({ message: "the credentials provided are invalid" });
    });
