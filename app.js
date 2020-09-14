const inquirer = require("inquirer");
const cTable = require("console.table");
const connection = require("./config/connect");

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
          "Delete departments, roles, or employees.",
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

        case "Delete departments, roles, or employees.":
          chooseTableDelete();
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

const chooseTableDelete = (tableDelete) => {
  inquirer
    .prompt({
      name: "choice",
      type: "rawlist",
      choices: ["Department", "Role", "Employee"],
    })
    .then(function (answers) {
      deleteFunc(answers.choice);
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
      // connection.query("SELECT * FROM department;", function (err, res) {
      //   Object.keys(res).forEach(function (key) {
      //     let row = res[key];
      //     depArr.push(row.name);
      //   });
      //   if (err) throw err;
      //   inquirer
      //     .prompt([
      //       {
      //         name: "to_delete",
      //         type: "rawlist",
      //         choices: depArr,
      //       },
      //     ])
      //     .then(function (answers) {
      //       console.log(answers);
      //     });
      // });
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
          {
            name: "department_id",
            type: "rawlist",
            // need list of departments and corresponding id
            message: "What department does this role belong to?",
            choices: ["Dep1", "Dep2", "Dep3", "Dep4"],
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
      const roles = JSON.stringify(getCurrentRoles());
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
          {
            name: "employee_role",
            type: "list",
            message: "What is the employees role?",
            // bring in array of current roles, display as choices
            choices: ["Manager", "Web Developer", "Customer Service"],
          },
        ])
        .then(function (answers) {
          connection.query(
            "INSERT INTO employee SET ?",
            {
              first_name: answers.employee_first,
              last_name: answers.employee_last,
              // need role ids that coincide with current roles
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
      init();
      break;
    case "Role":
      connection.query("SELECT * FROM role;", function (err, res) {
        console.table(res);
        if (err) throw err;
      });
      init();
      break;
    case "Employee":
      connection.query("SELECT * FROM employee;", function (err, res) {
        console.table(res);
        if (err) throw err;
      });
      init();
      break;
  }
};

const deleteFunc = (tableDelete) => {
  switch (tableDelete) {
    case "Department":
      let depArr = [];
      connection.query("SELECT * FROM department;", function (err, res) {
        Object.keys(res).forEach(function (key) {
          let row = res[key];
          depArr.push(row.name);
        });
        if (err) throw err;
        inquirer
          .prompt([
            {
              name: "to_delete",
              type: "rawlist",
              choices: depArr,
            },
          ])
          .then(function (answers) {
            connection.query(
              "DELETE FROM role WHERE ?;",
              { title: `${answers}` },
              function (err, res) {
                console.table(role);
              }
            );
          });
      });
      // console.log(depArr);
      init();
      break;
    case "Role":
      connection.query("SELECT * FROM role;", function (err, res) {
        console.table(res);
        if (err) throw err;
      });
      init();
      break;
    case "Employee":
      connection.query("SELECT * FROM employee;", function (err, res) {
        console.table(res);
        if (err) throw err;
      });
      init();
      break;
  }
};

// update what you want

// delete

init();
