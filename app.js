const mysql = require("mysql");
let toSelect;

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "luca2019",
  database: "employee_tracker",
});

connection.connect(function (err) {
  if (err) throw err;
  console.log(`connected as id ${connection.threadId}`);
  afterConnect();
});

function afterConnect() {
  toSelect = "role";
  connection.query(`SELECT * FROM ${toSelect}`, function (err, res) {
    if (err) throw err;
    console.log(res);
    connection.end();
  });
}
