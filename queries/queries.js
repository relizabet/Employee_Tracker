// const inquirer = require("inquirer");
const connection = require("./config/connect");

const insertDepartment = () => {
  connection.query(
    "INSERT INTO department SET ?",
    {
      name: answer.name,
    },
    function (err) {
      if (err) throw err;
      console.log(`The department '${answer.name}' was added succesfully.`);
    }
  );
};

module.exports = insertDepartment;
