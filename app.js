const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");

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
        "Exit",
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

        // case "Exit":
        //   return;
      }
    });
}

function addFunc() {
  console.log("add");
  inquirer
    .prompt({
      name: "name",
      type: "input",
      message: "What is the name of your department?",
    })
    .then(function (answer) {
      connection.query(
        "INSERT INTO department SET ?",
        {
          name: answer.name,
        },
        function (err) {
          if (err) throw err;
          console.log("Your department was added succesfully!");
          runSearch();
        }
      );
    });
}

function viewFunc() {
  console.log("view");
  runSearch();
}

function updateFunc() {
  console.log("update");
  runSearch();
}

runSearch();
