DROP DATABASE IF EXISTS employee_tracker;
CREATE DATABASE employee_tracker;

USE employee_tracker;

CREATE TABLE `department`
(
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar
(30) CHARACTER
SET utf8mb4
COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '',
  PRIMARY KEY
(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `employee`
(
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `first_name` varchar
(30) CHARACTER
SET utf8mb4
COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '',
  `last_name` varchar
(30) CHARACTER
SET utf8mb4
COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '',
  `role_id` int NOT NULL,
  `manager_id` int DEFAULT NULL,
  PRIMARY KEY
(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `role`
(
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar
(30) CHARACTER
SET utf8mb4
COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '',
  `salary` decimal
(10,2) NOT NULL,
  `department_id` int NOT NULL,
  PRIMARY KEY
(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;