const mysql = require('mysql2')
require('dotenv').config();

const pool = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'books',
    password: process.env.DB_PASSWORD
})

module.exports = pool