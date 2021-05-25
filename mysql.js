const mysql = require('mysql2');
const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "25092000",
  database: "threet1",
  multipleStatements: true
});
module.exports =con;