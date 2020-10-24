const inquirer = require ('inquirer');
const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  // Your MySQL username
  user: 'root',
  // Your MySQL password
  password: 'RosieB316!!!',
  database: 'employee_DB'
});

connection.connect(err => {
  if (err) throw err;
  console.log('connected as id ' + connection.threadId + '\n');
  createProduct();
});

createDepartment = () => {
  console.log('Inserting a new department...\n');
  const query = connection.query(
    'INSERT INTO department SET ?',
    {
      id: 'Rocky Road',
      department_name: 3.0,
    },
    function(err, res) {
      if (err) throw err;
      console.log(res.affectedRows + ' product inserted!\n');
      // Call updateProduct() AFTER the INSERT completes
      updateProduct();
    }
  );
  // logs the actual query being run
  console.log(query.sql);
};

updateDepartment = () => {
  console.log('Updating all Department quantities...\n');
  const query = connection.query(
    'UPDATE departments SET ? WHERE ?',
    [
      {
        quantity: 100
      },
      {
        flavor: 'Rocky Road'
      }
    ],
    function(err, res) {
      if (err) throw err;
      console.log(res.affectedRows + ' department updated!\n');
      // Call deleteProduct() AFTER the UPDATE completes
      deleteProduct();
    }
  );
  // logs the actual query being run
  console.log(query.sql);
};

deleteProduct = () => {
  console.log('Deleting all strawberry ice cream...\n');
  const query = connection.query(
    'DELETE FROM products WHERE ?',
    {
      flavor: 'strawberry'
    },
    function(err, res) {
      if (err) throw err;
      console.log(res.affectedRows + ' products deleted!\n');
      // Call readProducts() AFTER the DELETE completes
      readProducts();
    }
  );
  // logs the actual query being run
  console.log(query.sql);
};

readProducts = () => {
  console.log('Selecting all products...\n');
  connection.query('SELECT * FROM products', function(err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.log(res);
    connection.end();
  });
};
