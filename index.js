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

app.post('/biodata', (req, res) => {
   
    const { nama, alamat, agama } = req.body;

    
    if (!nama || !alamat || !agama) {
        return res.status(400).send({ message: "Nama, Alamat, and Agama are required" });
    }

    const sql = "INSERT INTO biodata (nama, alamat, agama) VALUES (?, ?, ?)";
    const values = [nama, alamat, agama];

    db.query(sql, values, (err, results) => {
        if (err) {
            
            res.status(500).send({
                message: "Error inserting data into database",
                error: err
            });
            return;
        }
        
        res.status(201).send({
            message: "New student added successfully!",
            data: { id: results.insertId, nama, alamat, agama}
        });
    });
});

app.listen(PORT, ()=> {
    console.log(`Server is running on port http://localhost:${PORT}`);
})
