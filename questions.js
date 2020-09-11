const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");

const choiceObj = {
  department: "this",
  role: "that",
  employee: "those",
};

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
          whichOne();
          break;

        case "View departments, roles, or employees.":
          viewFunc();
          break;

        case "Update employee roles.":
          updateFunc();
          break;

        case "Exit":
          connection.end();
          return;
      }
    });
}

function addFunc() {
  inquirer
    .prompt({
      name: "name",
      type: "input",
      message: "What is the name of your department?",
    })
    .then(function (answer) {
      connection.query(
        "INSERT INTO department SET ?",
        // SET ?', [{name: answerObject.departmentName}]
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

function whichOne() {
  inquirer
    .prompt({
      name: "choice",
      type: "rawlist",
      choices: ["Department", "Role", "Employee"],
    })
    .then(function (answer) {
      switch (answer.choice) {
        case "Department":
          console.log("Department");
          break;

        case "Role":
          console.log("Role");
          break;

        case "Employee":
          console.log("Employee");
          break;
      }
    });
}
