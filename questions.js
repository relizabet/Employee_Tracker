const inquirer = require("inquirer");
const Employee = require("./class/employee");
// add view update

const employeeQuestions = async (emp) => {
  inquirer
    .prompt([
      {
        name: "first_name",
        type: "input",
        message: `What is your first name?`,
      },
      {
        name: "last_name",
        type: "input",
        message: `What is your last name?`,
      },
    ])
    .then((answers) => {
      console.log("employeeQ");
      console.log(answers);
      roleQuestions();
    });
};

const roleQuestions = async (role) => {
  inquirer
    .prompt([
      {
        name: "title",
        type: "input",
        message: "What is the title of the role?",
      },
    ])
    .then((answers) => {
      console.log("roleQ");
      console.log(answers);
    });
};

const departmentQuestions = async (dep) => {
  dep = await inquirer
    .prompt([
      {
        name: "department_name",
        type: "input",
        message: "What is the department name?",
      },
    ])
    .then((answers) => {
      console.log("departmentQ");
      console.log(answers);
      employeeQuestions();
    });
  return dep;
};

const ask = async () => {
  departmentQuestions();

  //   departmentQuestions().then(employeeQuestions().then(roleQuestions()));
};

ask();

// console.log(
//   `     *** ******** ******* ***
//      *                      *
//      *        Hello         *
//      *        There         *
//      *       Friend:)       *
//      *                      *
//      *** ******** ******* ***`
// );

// const ask = async () => {
//   try {
//     inquirer
//       .prompt({
//         name: "action",
//         type: "rawlist",
//         message: "What would you like to do?",
//         choices: ["Add departments", "Add roles", "Add employees", "Exit"],
//       })
//       .then(function (answer) {
//         switch (answer.action) {
//           case "Add departments":
//             departmentQuestions();
//             break;

//           case "Add roles":
//             roleQuestions();
//             break;

//           case "Add employees":
//             employeeQuestions();
//             break;

//           case "Exit":
//             connection.end();
//         }
//       });
//   } catch (err) {
//     console.log(err);
//   }
// };

// ask();

// let ask = new Promise((resolve, reject) => {
//   let a = 1 + 1;
//   if (a === 2) {
//     resolve("Success");
//   } else {
//     reject("failed");
//   }
// });

// ask.then(employeeQuestions).then(roleQuestions).then(departmentQuestions);

// add - department role or employee

// view - department role or employee

// update - department role or employee
