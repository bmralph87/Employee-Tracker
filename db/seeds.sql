USE employeeDB;

INSERT INTO department (name)
VALUES ('HR'), ('Development'), ('Research'), ('Sales');

INSERT INTO role (title, salary, department_id)
VALUES 
--   ('Associate'), ('Manager'), ('Lead'), ('Programmer');
  ('Associate', '50000', 'Sales'),
  ('Manager', '75000', 'Research'),
  ('Lead', '65000', 'HR'),
  ('Programmer', '80000', 'Development'),
  
  

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES 
  ('Thelonius', 'Manicotti', 'Associate', 'Medusa Santos'),
  

