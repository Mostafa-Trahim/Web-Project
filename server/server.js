const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Hello World');
    });

    app.get('/profile',  (req, res) => {
        return res.status(401).json({ message: 'Unauthorized' });
    });

    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    });
    