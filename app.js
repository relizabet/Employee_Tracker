const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");
const util = require("util");
const fs = require("fs");

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
  // afterConnect();
  runSearch();
});

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

function addFunc(resWhichOne) {
  console.log(resWhichOne);
  inquirer
    .prompt({
      name: "name",
      type: "input",
      message: `What is the name of your ${resWhichOne}?`,
    })
    .then(function (answer) {
      console.log(resWhichOne);
      switch (resWhichOne) {
        case "Department":
          addFunc(answer.choice);
          console.log("dep");
          break;
        case "Role":
          addFunc(answer.choice);
          console.log("role");
          break;
        case "Employee":
          addFunc(answer.choice);
          console.log("empl");
          break;
      }
      // connection.query(
      //   `INSERT INTO ${resWhichOne} SET ?`,
      //   {
      //     name: answer.name,
      //   },
      //   function (err) {
      //     if (err) throw err;
      //     console.log(`The ${resWhichOne} was added succesfully.`);
      //     runSearch();
      //   }
      // );
    });
}

function whichOne(resWhichOne) {
  inquirer
    .prompt({
      name: "choice",
      type: "rawlist",
      choices: ["Department", "Role", "Employee"],
    })
    .then(function (answer) {
      switch (answer.choice) {
        case "Department":
          addFunc(answer.choice);
          break;

        case "Role":
          console.log("Role");
          addFunc(answer.choice);
          break;

        case "Employee":
          console.log("Employee");
          addFunc(answer.choice);
          break;
      }
      startAgain();
    });
}

function startAgain() {
  inquirer
    .prompt({
      name: "exit",
      type: "confirm",
      message: "Would you like to add another?",
    })
    .then(function (answer) {
      switch (answer.exit) {
        case true:
          runSearch();
          break;
        case false:
          connection.end();
          return;
      }
    });
}

// function afterConnect() {
//   toSelect = "role";
//   connection.query(`SELECT * FROM ${toSelect}`, function (err, res) {
//     if (err) throw err;
//     console.log(res);
//     connection.end();
//   });
// }

// function runSearch() {
//   inquirer
//     .prompt({
//       name: "action",
//       type: "rawlist",
//       message: "What would you like to do?",
//       choices: [
//         "Add departments, roles, or employees.",
//         "View departments, roles, or employees.",
//         "Update employee roles.",
//         "Exit",
//       ],
//     })
//     .then(function (answer) {
//       switch (answer.action) {
//         case "Add departments, roles, or employees.":
//           addFunc();
//           break;

//         case "View departments, roles, or employees.":
//           viewFunc();
//           break;

//         case "Update employee roles.":
//           updateFunc();
//           break;

//         case "Exit":
//           connection.end();
//           return;
//       }
//     });
// }

// function addFunc() {
//   console.log("add");
//   inquirer
//     .prompt({
//       name: "name",
//       type: "input",
//       message: "What is the name of your department?",
//     })
//     .then(function (answer) {
//       connection.query(
//         "INSERT INTO department SET ?",
//         // SET ?', [{name: answerObject.departmentName}]
//         {
//           name: answer.name,
//         },
//         function (err) {
//           if (err) throw err;
//           console.log("Your department was added succesfully!");
//           runSearch();
//         }
//       );
//     });
// }

function viewFunc() {
  console.log("view");
  runSearch();
}

function updateFunc() {
  console.log("update");
  runSearch();
}

// runSearch();

// --------------------------------------------------------------- //

// - Add departments, roles, employees
// Add
// * departments
// **
// * roles
// * employees

// - View departments, roles, employees
// View
// * departments
// * roles
// * employees

// - Update employee roles
// Update
// * departments
// * roles
// * employees
