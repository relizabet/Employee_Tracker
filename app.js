const mysql = require("mysql");
let toSelect;

const connection = mysql.createConnection({
  host: "localhost",
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

function runSearch() {
  inquirer
    .prompt({
      name: "action",
      type: "rawlist",
      message: "What would you like to do?",
      choices: [
        "Add departments, roles, or employees.",
        "View departments, roles, or employees.",
        "Update employee roles.",
      ],
    })
    .then(function (answer) {
      switch (answer.action) {
        case "Add departments, roles, or employees.":
          addFunc();
          break;

        case "View departments, roles, or employees.":
          viewFunc();
          break;

        case "Update employee roles.":
          updateFunc();
          break;
      }
    });
}

function addFunc() {
  console.log("add");
}

function addFunc() {
  console.log("view");
}

function addFunc() {
  console.log("update");
}
