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
          addFunc();
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
