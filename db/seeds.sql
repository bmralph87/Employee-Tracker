USE employee_DB;

INSERT INTO department (name)
VALUES ('HR'), ('Development'), ('Research'), ('Sales');

INSERT INTO role (title, salary, department_id)
VALUES 
--   ('Associate'), ('Manager'), ('Lead'), ('Programmer');
  ('Associate', '50000', 4),
  ('Manager', '75000', 3),
  ('Lead', '65000', 1),
  ('Programmer', '80000', 2);
  
  

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
  ('Thelonius', 'Manicotti', 1, NULL);
  

