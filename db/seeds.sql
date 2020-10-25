USE employee_db;

INSERT INTO departments (name)
VALUES ('HR'), ('Development'), ('Research'), ('Sales'), ('Legal');

INSERT INTO roles (title, salary, department_id)
VALUES 
--   ('Associate'), ('Manager'), ('Lead'), ('Programmer'), ('Megatron'), ('Training Manager'), ('Litigator'); 
  ('Associate', '50000', 4),
  ('Manager', '75000', 3),
  ('Lead', '65000', 1),
  ('Programmer', '80000', 2),
  ('Megatron', '900000', 3 ), 
  ('Training Manager', '90000', 3),
  ('Litigator', '100000', 5);
  
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES 
  ('Thelonius', 'Manicotti', 1, NULL),
  ('Buttahs', 'Tourmaline', 2, 2),
  ('Sadie', 'Squirrel', 2, 2),
  ('Maya', 'Moore', 3, NULL),
  ('Letitia', 'Deli', 4, NULL),
  ('Elijah', 'Turquat', 4, NULL),
  ('Duck', 'Tastic', 4, NULL),
  ('Mable', 'Smithers', 4, NULL),
  ('George', 'Yoo', 5, NULL),
  ('Michael Bay', 'Transformers', 6, NULL),
  ('Michael Bay', 'Transformers', 7, NULL);

 