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
  // createEmployee();
});

createDepartment = () => {
  console.log('Inserting a new department...\n');
  const query = connection.query(
    'INSERT INTO department SET ?',
    {
      id: 'HR', 'Development', 'Research', 'Sales'
    },

    function(err, res) {
      if (err) throw err;
      console.log(res.affectedRows + ' department inserted!\n');
      // Call updateDepartment() AFTER the INSERT completes
      updateDepartment();
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
        quantity: 4
      },
      
    ],
    function(err, res) {
      if (err) throw err;
      console.log(res.affectedRows + ' department updated!\n');
      // Call deleteProduct() AFTER the UPDATE completes
      deleteDepartment();
    }
  );
  // logs the actual query being run
  console.log(query.sql);
};

// deleteDepartment = () => {
//   console.log('Deleting all departments...\n');
//   const query = connection.query(
//     'DELETE FROM products WHERE ?',
//     {
//       flavor: 'strawberry'
//     },
//     function(err, res) {
//       if (err) throw err;
//       console.log(res.affectedRows + ' products deleted!\n');
//       // Call readProducts() AFTER the DELETE completes
//       readProducts();
//     }
//   );
//   // logs the actual query being run
//   console.log(query.sql);
// };

readDepartment = () => {
  console.log('Selecting all departments...\n');
  connection.query('SELECT * FROM departments', function(err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.log(res);
    connection.end();
  });
};
