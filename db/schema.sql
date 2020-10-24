DROP DATABASE IF EXISTS employee_DB;
CREATE DATABASE employee_DB;
USE employee_DB;

CREATE TABLE department
(
    id INT NOT NULL
    AUTO_INCREMENT,
    department_name VARCHAR
    (30) NULL,
);

CREATE TABLE roles
(
    id INT NOT NULL
    PRIMARY KEY,
    title VARCHAR
    (30) NULL,
    salary DECIMAL
    NULL,
    department_id INT NULL
    PRIMARY KEY,
);


CREATE TABLE employees
(
  id INT NOT NULL
  AUTO_INCREMENT,
  first_name VARCHAR
  (30) NULL,
  last_name VARCHAR
  (30) NULL,
  role_id INT NULL
  AUTO_INCREMENT,
  manager_id INT NULL
  AUTO_INCREMENT,
);



