const inquirer = require("inquirer");
const cTable = require("console.table");
const connection = require("./config/connect");
// const { query } = require("./config/connect");

// initialize program by choosing what action to take
const init = () => {
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
          break;

        case "Exit":
          connection.end();
      }
    });
};

// choose which table to add to
const chooseTableAdd = (table) => {
  inquirer
    .prompt({
      name: "choice",
      type: "rawlist",
      choices: ["Department", "Role", "Employee"],
    })
    .then(function (answer) {
      addFunc(answer.choice);
    });
};

// choose which table to view
const chooseTableView = (tableView) => {
  inquirer
    .prompt({
      name: "choice",
      type: "rawlist",
      choices: ["Department", "Role", "Employee"],
    })
    .then(function (answers) {
      viewFunc(answers.choice);
    });
};

// add what you want
const addFunc = (table) => {
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
            function (err, res) {
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
            function (err, res) {
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
            function (err, res) {
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
};

// view what you want
const viewFunc = (tableView) => {
  switch (tableView) {
    case "Department":
      connection.query("SELECT * FROM department;", function (err, res) {
        console.table(res);
        if (err) throw err;
      });
      break;
    case "Role":
      connection.query("SELECT * FROM role;", function (err, res) {
        console.table(res);
        if (err) throw err;
      });
      break;
    case "Employee":
      connection.query("SELECT * FROM employee;", function (err, res) {
        console.table(res);
        if (err) throw err;
      });
      break;
  }
};

// update what you want

init();
