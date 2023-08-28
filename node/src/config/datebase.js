const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'agunic1004',
    database: "barfer"
});

module.exports = db;
