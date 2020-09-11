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
  init();
});

// initialize program by choosing what action to take
function init() {
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
          chooseTable();
          break;

        case "View departments, roles, or employees.":
          chooseTable();
          break;

        case "Update employee roles.":
          chooseTable();
          break;

        // not working after loop
        case "Exit":
          connection.end();
      }
    });
}

// choose which table to work in
function chooseTable(resChooseTable) {
  inquirer
    .prompt({
      name: "choice",
      type: "rawlist",
      choices: ["Department", "Role", "Employee"],
    })
    .then(function (answer) {
      console.log(answer.choice);
      switch (answer.choice) {
        case "Department":
          addFunc(answer.choice);
          break;

        case "Role":
          console.log("Role");
          addFunc(answer.choice);
          // init();
          break;

        case "Employee":
          console.log("Employee");
          addFunc(answer.choice);
          // init();
          break;
      }
    });
}

function addFunc(resChooseTable) {
  console.log(resChooseTable);
  inquirer
    .prompt({
      name: "name",
      type: "input",
      message: `What is the name of your ${resChooseTable}?`,
    })
    .then(function (answer) {
      // get input
      console.log(`input value: ${answer.name}`);
      // get choice of table
      console.log(`name of table: ${resChooseTable}`);
      switch (resChooseTable) {
        case "Department":
          console.log(answer.name);
          let res = resChooseTable.toLowerCase();
          console.log(`121 lowered res: ${res}`);
          connection.query(
            `INSERT INTO ${res} SET ?`,
            {
              name: answer.name,
            },
            function (err) {
              if (err) throw err;
              console.log(`The ${res} '${answer.name}' was added succesfully.`);
            }
          );
          init();
          break;
        case "Role":
          console.log(answer.name);
          // init();
          break;
        case "Employee":
          console.log(answer.name);
          // init();
          break;
      }
    });
}

// function addItem(resChooseTable, answer) {
//   console.log(`117 addItem ${resChooseTable}`);
//   console.log(`118 answer input ${answer.name}`);

//   let res = resChooseTable.toLowerCase();
//   console.log(`121 lowered res: ${res}`);
//   connection.query(
//     `INSERT INTO ${res} SET ?`,
//     {
//       name: answer.name,
//     },
//     function (err) {
//       if (err) throw err;
//       console.log(`The ${res} '${answer.name} was added succesfully.`);
//     }
//   );
// }

function viewFunc() {
  console.log("view");
  init();
}

function updateFunc() {
  console.log("update");
  init();
}

// --------------------------------------------------------------- //
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
