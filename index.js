const express = require('express');
let mysql = require('mysql2');
const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json()); 

app.get('/', (req, res) =>{
    res.send('Hello World!');
})

const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    port: '3309',
    password: '905.Nasywa',
    database: 'mahasiswa'
})

db.connect((err)=> {
    if(err){
        console.log('Error connecting to Mysql: ' + err.stack);
        return;

    }
    console.log('Connected to Mysql successfully');

})

app.get('/biodata', (req, res) => {
    
    const sql = "SELECT * FROM biodata"; 
    db.query(sql, (err, results) => {
        if (err) {
            
            res.status(500).send({
                message: "Error retrieving data from database",
                error: err
            });
            return;
        }
        
        res.json(results);
    });
});