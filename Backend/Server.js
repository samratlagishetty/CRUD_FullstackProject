const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'Lsamrat@2001',
    database:'CRUD'
})

db.connect(err => {
    if (err) {
        console.error("MySQL connection failed:", err.message);
        process.exit(1); // Stop the server if DB fails
    }
    console.log("Connected to MySQL database");
});

// app.use((req, res, next) => {
//     console.log(`[${req.method}] ${req.url}`);
//     next();
//   });
  

app.get('/', (req, res) => {
    const sql = "SELECT * FROM CRUDItems"; // Ensure this table exists
    db.query(sql, (err, data) => {
        if (err) {
            console.error("Query error:", err.message);
            return res.status(500).json({ error: "Database query failed" });
        }
        return res.json(data);
    });
});

app.post('/create', (req, res) => {
    const sql = "INSERT INTO CRUDItems (Name, Email) VALUES (?, ?)";
    const values = [req.body.Name, req.body.Email];
    db.query(sql, values, (err, data) => {
        if (err) {
            console.error("Query error:", err.message);
            return res.status(500).json({ error: "Database query failed" });
        }
        return res.json(data);
    });
});

app.put('/update/:id', (req, res) => {
    const sql = "UPDATE CRUDItems SET Name = ?, Email = ? WHERE Id = ?";
    const values = [req.body.Name, req.body.Email];
    const id = req.params.id;

    db.query(sql, [...values, id], (err, data) => {
        if (err) {
            console.error("Query error:", err.message);
            //return res.status(500).json({ error: err.message });
        }
        return res.json(data);
    });
});

app.delete('/delete/:id', (req, res) => {
    const sql = "DELETE FROM CRUDItems WHERE Id = ?";
    const id = req.params.id;

    db.query(sql, [id], (err, data) => {
        if (err) {
            console.error("Query error:", err.message);
            //return res.status(500).json({ error: err.message });
        }
        return res.json(data);
    });
});

app.listen(8081,()=>{
    console.log("hello im running server port 8081")
})