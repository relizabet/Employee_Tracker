const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "luca2019",
  database: "employee_tracker",
});

connection.connect(function (err) {
  if (err) throw err;
  // console.log(`connected as id ${connection.threadId}`);
});

module.exports = connection;
