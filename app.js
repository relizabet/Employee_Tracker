const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");
const util = require("util");
const fs = require("fs");

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
          whichOne(answer.choice);
          console.log("dep");
          startAgain();
          break;
        case "Role":
          whichOne(answer.choice);
          console.log("role");
          startAgain();
          break;
        case "Employee":
          whichOne(answer.choice);
          console.log("empl");
          startAgain();
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
      // message: "Which one would you like to add?",
      choices: ["Department", "Role", "Employee"],
    })
    .then(function (answer) {
      switch (answer.choice) {
        case "Department":
          addFunc(answer.choice);
          runSearch();
          break;

        case "Role":
          console.log("Role");
          addFunc(answer.choice);
          runSearch();
          break;

        case "Employee":
          console.log("Employee");
          addFunc(answer.choice);
          runSearch();
          break;
      }
    });
}

// // function to initialize program
// async function init() {
//   try {
//     // store await askquestions to pass into generateMarkdown
//     const answers = await askQuestions();
//     // write the file
//     writeToFile("readme_0.md", generateMarkdown(answers));
//     writeToFile("LICENSE.md", generateLicense(answers));
//   } catch (err) {
//     // return any errors
//     console.log(err);
//   }
// }

// function startAgain() {
//   inquirer
//     .prompt({
//       name: "exit",
//       type: "rawlist",
//       message: "Would you like to add another?",
//       choices: ["Yes", "No, I'd like to Exit"],
//     })
//     .then(function (answer) {
//       console.log(answer);
//       switch (answer.exit) {
//         case "Yes":
//           runSearch();
//           break;
//         case "No, I'd like to Exit":
//           endConnection();
//       }
//     });
// }

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

function endConnection() {
  connection.end();
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
