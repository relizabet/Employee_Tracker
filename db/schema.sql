DROP DATABASE IF EXISTS employee_tracker;
CREATE DATABASE employee_tracker;

USE employee_tracker;

CREATE TABLE `department`
(
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar
(30) CHARACTER
SET
NOT NULL DEFAULT '',
  PRIMARY KEY
(`id`)
)

CREATE TABLE `employee`
(
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `first_name` varchar
(30) CHARACTER
SET
NOT NULL DEFAULT '',
  `last_name` varchar
(30) CHARACTER
SET
NOT NULL DEFAULT '',
  `role_id` int NOT NULL,
  `manager_id` int DEFAULT NULL,
  PRIMARY KEY
(`id`)
)

CREATE TABLE `role`
(
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar
(30) CHARACTER
SET
NOT NULL DEFAULT '',
  `salary` decimal
(10,2) NOT NULL,
  `department_id` int NOT NULL,
  PRIMARY KEY
(`id`)
) 