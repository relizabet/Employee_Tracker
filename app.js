const inquirer = require("inquirer");
const cTable = require("console.table");
const connection = require("./config/connect");
// const queries = require("./queries/queries");
// const insertDepartment = require("./queries/queries");

// return new Promise

// console.table(department);

// initialize program by choosing what action to take
function init() {
  inquirer
    .prompt([
      {
        name: "action",
        type: "rawlist",
        message: "What would you like to do?",
        choices: [
          "Add departments, roles, or employees.",
          "View departments, roles, or employees.",
          "Update employee roles.",
          "Exit",
        ],
      },
    ])
    .then(function (answer) {
      switch (answer.action) {
        case "Add departments, roles, or employees.":
          chooseTableAdd();
          break;

        case "View departments, roles, or employees.":
          chooseTableView();
          break;

        case "Update employee roles.":
          chooseTable();
          break;

        case "Exit":
          connection.end();
      }
    });
}

// choose which table to work in
function chooseTableAdd(table) {
  inquirer
    .prompt({
      name: "choice",
      type: "rawlist",
      choices: ["Department", "Role", "Employee"],
    })
    .then(function (answer) {
      addFunc(answer.choice);
    });
}

function addFunc(table) {
  console.log(table);
  switch (table) {
    case "Department":
      inquirer
        .prompt({
          name: "department_name",
          type: "input",
          message: "What is the name of the department?",
        })
        .then(function (answers) {
          connection.query(
            "INSERT INTO department SET ?",
            { name: answers.department_name },
            function (err) {
              if (err) throw err;
              console.log(
                `\n The department ${answers.department_name} has been added.`
              );
            }
          );
          init();
        });
      break;
    case "Role":
      inquirer
        .prompt([
          {
            name: "role_title",
            type: "input",
            message: "What is the name of the role?",
          },
          {
            name: "role_salary",
            type: "input",
            message: "What is the salary of the role?",
          },
        ])
        .then(function (answers) {
          connection.query(
            "INSERT INTO role SET ?",
            {
              title: answers.role_title,
              salary: answers.role_salary,
              department_id: "4",
            },
            function (err) {
              if (err) throw err;
              console.log(`\n The role ${answers.role_title} has been added.`);
            }
          );
          init();
        });
      break;
    case "Employee":
      inquirer
        .prompt([
          {
            name: "employee_first",
            type: "input",
            message: "What is your employees first name?",
          },
          {
            name: "employee_last",
            type: "input",
            message: "What is your employees last name?",
          },
        ])
        .then(function (answers) {
          connection.query(
            "INSERT INTO employee SET ?",
            {
              first_name: answers.employee_first,
              last_name: answers.employee_last,
              role_id: "8",
            },
            function (err) {
              if (err) throw err;
              console.log(
                `\n ${answers.employee_first} ${answers.employee_last} has been added.`
              );
            }
          );
          init();
        });
      break;
  }
}

function viewFunc(table) {
  connection.query(`SELECT * FROM department;`, function (err) {
    console.table(answer);
    if (err) throw err;
    // console.log(`The ${res} '${answer.name}' was added succesfully.`);
  });
}

// function updateFunc() {
//   console.log("update");
//   init();
// }

// --------------------------------------------------------------- //
// function whichOne(resWhichOne) {
//   inquirer
//     .prompt({
//       name: "choice",
//       type: "rawlist",
//       choices: ["Department", "Role", "Employee"],
//     })
//     .then(function (answer) {
//       switch (answer.choice) {
//         case "Department":
//           addFunc(answer.choice);
//           runSearch();
//           break;

//         case "Role":
//           console.log("Role");
//           addFunc(answer.choice);
//           runSearch();
//           break;

//         case "Employee":
//           console.log("Employee");
//           addFunc(answer.choice);
//           runSearch();
//           break;
//       }
//     });
// }
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

init();
