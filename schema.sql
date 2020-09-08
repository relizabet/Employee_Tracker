DROP DATABASE IF EXISTS employee_tracker;
CREATE DATABASE employee_tracker;

USE employee_tracker;

CREATE TABLE department
(
    id INT NOT NULL
    AUTO_INCREMENT,
    name VARCHAR
    (30),
    PRIMARY KEY
    (id)
);

    CREATE TABLE role
    (
        id INT NOT NULL
        AUTO_INCREMENT,
    title VARCHAR
        (30),
    salary DECIMAL
        (10,2),
    department_id INT NOT NULL
);