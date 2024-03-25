
    const express = require('express');
    const cors = require('cors');
    const { Pool } = require('pg');


    const app = express();
    app.use(cors());
    app.use(express.json());


    const port = 3001;


    app.get('/', (req, res) => {
        res.status(200).json({result: 'success'});
        
        pool.query('SELECT * FROM UserInformation', (error, result) => {
            if (error) {
                res.status(500).json({error: error.message})
            }
            res.status(200).json(result.rows)
        })
    });

  

    const  openDb = () => {
        const pool = new Pool({
            user: 'postgres',
            host: 'localhost',
            database: 'Memehub_project',
            password: 'admin',
            port: 5432,
        });
    
    return pool;
    }
    
    
    app.post("/new",(req,res) => {
        const pool = openDb();

        pool.query('INSERT INTO UserInformation (Email, Password, Username ) VALUES ( Test@gmail.com, Test1234, Test) returning *', 
        [req.body.description], 
        (error, result) => {
            if (error) {
                res.status(500).json({error: error.message})
            }
            res.status(200).json({result: 'success'})
        })
    })
    
    app.listen(port)
