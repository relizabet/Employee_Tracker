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
              message: "What department does this role belong to?",
              choices: depArr,
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
                console.log(
                  `\n The role ${answers.role_title} has been added.`
                );
              }
            );
            init();
          });
      });
      break;
    case "Employee":
      let roleArr = [];
      connection.query("SELECT * FROM role;", function (err, res) {
        Object.keys(res).forEach(function (key) {
          let row = res[key];
          roleArr.push(row.title);
        });
        if (err) throw err;
        // });
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
              choices: roleArr,
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
      });
      break;
  }
};

// view what you want
const viewFunc = (tableView) => {
  switch (tableView) {
    case "Department":
      connection.query("SELECT * FROM department;", function (err, res) {
        console.log("\n-----------------");
        console.log("|  DEPARTMENTS  |");
        console.log("-----------------");
        console.table(res);
        if (err) throw err;
      });
      init();
      break;
    case "Role":
      connection.query("SELECT * FROM role;", function (err, res) {
        console.log("\n-----------------");
        console.log("|     ROLES     |");
        console.log("-----------------");
        console.table(res);
        if (err) throw err;
      });
      init();
      break;
    case "Employee":
      connection.query("SELECT * FROM employee;", function (err, res) {
        console.log("\n-----------------");
        console.log("|   EMPLOYEES   |");
        console.log("-----------------");
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
            console.log(answers.to_delete);
            var query = connection.query(
              "DELETE FROM department WHERE ?;",
              { name: `${answers.to_delete}` },
              function (err, res) {
                if (err) throw err;
              }
            );
            // console.log(query.sql);
            init();
          });
      });
      break;
    case "Role":
      let roleArr = [];
      connection.query("SELECT * FROM role;", function (err, res) {
        Object.keys(res).forEach(function (key) {
          let row = res[key];
          roleArr.push(row.title);
        });
        if (err) throw err;
        inquirer
          .prompt([
            {
              name: "to_delete",
              type: "rawlist",
              choices: roleArr,
            },
          ])
          .then(function (answers) {
            console.log(answers.to_delete);
            var query = connection.query(
              "DELETE FROM role WHERE ?;",
              { title: `${answers.to_delete}` },
              function (err, res) {
                if (err) throw err;
              }
            );
            // console.log(query.sql);
            init();
          });
      });
      break;
    case "Employee":
      let empArr = [];
      connection.query("SELECT * FROM employee;", function (err, res) {
        Object.keys(res).forEach(function (key) {
          let row = res[key];
          empArr.push(row.first_name);
        });
        if (err) throw err;
        inquirer
          .prompt([
            {
              name: "to_delete",
              type: "rawlist",
              choices: empArr,
            },
          ])
          .then(function (answers) {
            console.log(answers.to_delete);
            var query = connection.query(
              "DELETE FROM employee WHERE ?;",
              { first_name: `${answers.to_delete}` },
              function (err, res) {
                if (err) throw err;
              }
            );
            // console.log(query.sql);
            init();
          });
      });
      break;
  }
};

// update what you want

// delete

init();
