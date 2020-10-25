const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');
const data = [];

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
  console.log('Connected as id ' + connection.threadId + '\n');
  welcomePrompt();
});
const welcomePrompt = () => {
  console.log(`
  ,-----------------------------------------------------.
  |                                                     |
  |     _____                 _                         |
  |    | ____|_ __ ___  _ __ | | ___  _   _  ___  ___   |
  |    |  _| | '_ \` _ \\| '_ \\| |/ _ \\| | | |/ _ \\/ _ \\  |
  |    | |___| | | | | | |_) | | (_) | |_| |  __/  __/  |
  |    |_____|_| |_| |_| .__/|_|\\___/ \\__, |\\___|\\___|  |
  |                    |_|            |___/             |
  |                                                     |
  |     __  __                                          |
  |    |  \\/  | __ _ _ __   __ _  __ _  ___ _ __        |
  |    | |\\/| |/ _\` | '_ \\ / _\` |/ _\` |\/ _ \\ '__|       |
  |    | |  | | (_| | | | | (_| | (_| |  __/ |          |
  |    |_|  |_|\\__,_|_| |_|\\__,_|\\__, |\\___|_|          |
  |                              |___/                  |
  |                                                     |
  \`-----------------------------------------------------'
  `);
  // connection.query(`SELECT * FROM employees`, function(err, res) {
  // if (err) throw err;
  // console.log(res);
  // for (let i = 0; i < res.length; i++) {
  //     let empName = res[i].first_name;
  //     data.push(empName);
  //     console.log(data);
  // }
  // });
  start();
};
const start = () => {
  inquirer.prompt(
    {
      type: 'list',
      name: 'querySelect',
      message: 'What would you like to do?',
      choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add a Department', 'Add a Role', 'Add an Employee', 'Update Employee', 'Exit immediately and never return!']
    }
  )
    .then((answer) => {
      switch (answer.querySelect) {
        case 'View All Departments':
          readDepartments();
          break;
        case 'View All Roles':
          readRoles();
          break;
        case 'View All Employees':
          readEmployees();
          break;
        case 'Exit immediately and never return!':
          exit();
          break;
        case 'Add a Department':
          addDepartment();
          break;
        case 'Add a Role':
          addRole();
          break;
        case 'Add an Employee':
          addEmployee();
          break;
        case 'Update Employee':
          updateEmployee();
          break;
      }
    });
};
const readDepartments = () => {
  console.log('Selecting all Departments... \n');
  connection.query(`SELECT * FROM departments;`, function (err, res) {
    if (err) throw err;
    // log all the results of the select statement
    console.table(res);
    start();
  });
};
const readRoles = () => {
  console.log('Selecting all Roles... \n');
  connection.query(`SELECT roles.id, roles.title, roles.salary, departments.name AS departments_name FROM roles LEFT JOIN departments ON roles.department_id = departments.id;`, function (err, res) {
    if (err) throw err;
    console.table(res);
    start();
  });
};
const readEmployees = () => {
  console.log('Selecting all Employees... \n');
  connection.query(`SELECT employees.id, employees.first_name, employees.last_name, roles.title, roles.salary, departments.name AS Dept_name, 
                  employees.manager_id AS manager
                  FROM employees
                  RIGHT JOIN roles ON employees.role_id = roles.id
                  RIGHT JOIN departments ON roles.department_id = departments.id
                  ORDER BY employees.id;`,
    function (err, res) {
      if (err) throw err;
      console.table(res);
      start();
    });
};
const addDepartment = () => {
  console.log('Adding Department to the Database... \n');
  inquirer.prompt([
    {
      name: 'department',
      type: 'input',
      message: 'What Department would you like to add?'
    }
  ])
    .then(answer => {
      connection.query(`
          INSERT INTO departments SET ?;`,
        {
          name: answer.department
        },
        function (err, res) {
          if (err) throw err;
          console.log(res.affectedRows + ' Sucess! Department Added!');
          start();
        }
      )
    });
};
const addRole = () => {
  inquirer.prompt([
    {
      name: 'role',
      type: 'input',
      message: 'What Role would you like to add?'
    },
    {
      name: 'salary',
      type: 'number',
      message: 'What is the salary for this role?'
    },
    {
      name: 'roleDept',
      type: 'input',
      message: 'What is the Department id for this role? \n (To see the Department id numbers click the "View All Departments") \n'
    }
  ])
    .then(answer => {
      connection.query(`
          INSERT INTO roles SET ?;`,
        {
          title: answer.role,
          salary: answer.salary,
          department_id: answer.roleDept
        },
        function (err, res) {
          if (err) throw err;
          console.log(res.affectedRows + ' Role Added! Please View all Roles to verify.');
          start();
        }
      )
    })
};
const addEmployee = () => {
  inquirer.prompt([
    {
      name: 'firstName',
      type: 'input',
      message: "What is this Employee's First Name?"
    },
    {
      name: 'lastName',
      type: 'input',
      message: "What is this Employee's Last Name?"
    },
    {
      name: 'role',
      type: 'input',
      message: `What is the Employee's Role ID? \n (1) Associate \n (2) Manager \n (3) Lead \n (4) Programmer \n (5) Megatron \n (6) Training Manager \n (7) Litigator \n`
      // validate: function(value) {
      //     var valid = !isNaN(parseFloat(value));
      //     return valid || `Please enter the Employee's Role Id Number`;
      // },
      // filter: Number
    },
    {
      name: 'manager',
      type: 'number',
      message: `Who is this employee's manager?`
      // validate: function(value) {
      //     var valid = !isNaN(parseFloat(value));
      //     return valid || `Please enter the Employee's Role Id Number`;
      // },
      // filter: Number
    }
  ])
    .then((answer) => {
      connection.query(`INSERT INTO employees SET ?;`,
        {
          first_name: answer.firstName,
          last_name: answer.lastName,
          role_id: answer.role,
          manager_id: answer.manager
        },
        function (err, res) {
          if (err) throw err;
          console.log(res.affectedRows + 'Sucess! Employee added!')
          start();
        });
    });
};

const names = [];
// const 

updateEmployee = () => {

  console.log('Displaying all employee information in the Database... \n');
  connection.query(`SELECT CONCAT(employees.first_name, " ", employees.last_name) AS Employee_Name FROM employees;`,

    function (err, res) {
      if (err) throw err;
      for (let i = 0; i < res.length; i++) {
        let name = res[i].Employee_Name;
        names.push(name);
      }
      console.log(names);

      inquirer.prompt([
        {
          name: 'update',
          type: 'list',
          message: 'What Employee would you like to update a role for?',
          choices: names
        }
      ])
        .then((response) => {
          let selectedEmp = response;
          inquirer.prompt({
            type: 'input',
            name: 'empRoleUpdate',
            message: `What is the new role for ${selectedEmp} ? `
          })
            .then(
              connection.query(`UPDATE employees SET role_id VALUES ? WHERE CONCAT(employees.first_name, " ", employees.last_name) = ${selectedEmp}; `,
                {
                  role_id: response.empRole
                },
                (err, res) => {
                  if (err) throw err;
                  console.log(`\n ${selectedEmp} 's role updated! \n`);;
                },
                startApp()
              )
            );
        });
    });
};
const exit = () => {
  connection.end();
};




// connect.
// // // function is_Numeric(num) {
// // //   return !isNaN(parseFloat(num)) && isFinite(num);
// // // }

// // const promptUser = dbData => {
// //   if (!dbData) {
// // //     dbData = [];
// // //   }

//   inquirer.prompt([
//     {
//       type: 'list',
//       name: 'welcome',
//       message: 'What would you like to do? (Required)',
//       choices: ['View ALL departments', 'View ALL roles', 'View ALL Employees', 'Add a department', 'Add a role', 'Add an employee', 'Delete a department', 'Delete a role', 'Delete an employee', 'Exit this database and never return ']
//     }

//   ]).then(function (answer) {
//     if (answer.welcome === 'View all departments') {
//       viewDepartments();
//     } else if (answer.welcome === 'View all roles') {
//       viewRoles();
//     } else if (answer.welcome === 'View all employees') {
//       viewEmployees();
//     } else if (answer.welcome === 'Add a department') {
//       addDepartment();
//     } else if (answer.welcome === 'Add a role') {
//       addRole();
//     } else if (answer.welcome === 'Add an employee') {
//       addEmployee();
//     } else if (answer.welcome === 'Update employee role') {
//       updateRole();
//     }
//     else if (answer.welcome === 'Exit this database and never return') {
//       connection.end();
//     }
//   })


//   function viewDepartments() {
//     var query = "SELECT * FROM department";
//     connection.query(query, function (err, res) {
//       console.log(`DEPARTMENTS:`)
//       res.forEach(department => {
//         console.log(`ID: ${department.id} | Name: ${department.name}`)
//       })
//     });

//     function viewDepartments() {
//       var query = "SELECT * FROM department";
//       connection.query(query, function (err, res) {
//         console.log(`DEPARTMENTS:`)
//         res.forEach(department => {
//           console.log(`ID: ${department.id} | Name: ${department.name}`)
//         })
//       });




//       message: "Welcome to the Employee database for Cointreau Corp!! Would you like to: \n" +
//         "1) View ALL departments \n" +
//         "2) View ALL roles \n" +
//         "3) View ALL employees \n" +
//         "4) Add a department \n" +
//         "5) Add a role \n" +
//         "6) Add an employee \n" +
//         "7) Update employee role \n" +
//         "8) Delete a department \n" 
//         "8) Delete a role \n" 
//         "9) Delete an employee \n" 
//         "10) Exit this database and never return \n",
//       ]
//     }
//     



//       function viewRoles() {
//         var query = "SELECT * FROM role";
//         connection.query(query, function (err, res) {
//           console.log(`ROLE:`)
//           res.forEach(role => {
//             console.log(`ID: ${role.id} | Title: ${role.title} | Salary: ${role.salary} | Department ID: ${role.department_id}`);
//           })
//         });






//     console.log('connected as id ' + connection.threadId + '\n');
//   // createEmployee();
//   readDepartment();

// });

// createDepartment = () => {
//   console.log('Inserting a new department...\n');
//   const query = connection.query(
//     'INSERT INTO department SET ?',
//     {
//       id: ['HR', 'Development', 'Research', 'Sales']
//     },

//     function(err, res) {
//       if (err) throw err;
//       console.log(res.affectedRows + ' department inserted!\n');
//       // Call updateDepartment() AFTER the INSERT completes
//       updateDepartment();
//     }
//   );
//   // logs the actual query being run
//   console.log(query.sql);
// };

// updateDepartment = () => {
//   // connection.query()
//   console.log('Updating all Department quantities...\n');
//   const query = connection.query(
//     'UPDATE departments SET ? WHERE ?',
//     [
//       {
//         quantity: 4
//       },

//     ],
//     function(err, res) {
//       if (err) throw err;
//       console.log(res.affectedRows + ' department updated!\n');
//       // Call deleteProduct() AFTER the UPDATE completes
//       deleteDepartment();
//     }
//   );
//   // logs the actual query being run
//   console.log(query.sql);
// };

// readDepartment = () => {
//   console.log('Selecting all departments...\n');
//   connection.query('SELECT * FROM department', function(err, res) {
//     if (err) throw err;
//     // Log all results of the SELECT statement
//     console.log(res);
//     connection.end();
//   });
// };

// connection.connect(err => {
//   if (err) throw err;
//   console.log('connected as id ' + connection.threadId + '\n');
//   // createEmployee();
//   readRole();

// });

// createRole = () => {
//   console.log('Inserting a new role...\n');
//   const query = connection.query(
//     'INSERT INTO role SET ?',
//     {
//       id: ['Associate', 'Manager', 'Lead', 'Programmer']
//     },

//     function(err, res) {
//       if (err) throw err;
//       console.log(res.affectedRows + ' role inserted!\n');
//       // Call updateRole() AFTER the INSERT completes
//       updateRole();
//     }
//   );
//   // logs the actual query being run
//   console.log(query.sql);
// };

// updateRole = () => {
//   console.log('Updating all Role quantities...\n');
//   const query = connection.query(
//     'UPDATE role SET ? WHERE ?',
//     [
//       {
//         quantity: 4
//       },

//     ],
//     function(err, res) {
//       if (err) throw err;
//       console.log(res.affectedRows + ' role updated!\n');
//       // Call deleteProduct() AFTER the UPDATE completes
//       deleteRole();
//     }
//   );
//   // logs the actual query being run
//   console.log(query.sql);
// };

// readRole = () => {
//   console.log('Selecting all roles...\n');
//   connection.query('SELECT * FROM role', function(err, res) {
//     if (err) throw err;
//     // Log all results of the SELECT statement
//     console.log(res);
//     connection.end();
//   });
// };

// connection.connect(err => {
//   if (err) throw err;
//   console.log('connected as id ' + connection.threadId + '\n');
//   // createEmployee();
//   readEmployee();

// });

// createEmployee = () => {
//   console.log('Inserting a new employee...\n');
//   const query = connection.query(
//     'INSERT INTO employee SET ?',
//     {
//       id: ['Thelonius', 'Manicotti','Buttahs', 'Tourmaline','Sadie', 'Squirrel','Maya', 'Moore','Letitia', 'Deli','Elijah', 'Turquat', 'Duck', 'Tastic']
//     },

//     function(err, res) {
//       if (err) throw err;
//       console.log(res.affectedRows + ' employee inserted!\n');
//       // Call updateRole() AFTER the INSERT completes
//       updateEmployee();
//     }
//   );
//   // logs the actual query being run
//   console.log(query.sql);
// };

// updateEmployee= () => {
//   console.log('Updating all Employee quantities...\n');
//   const query = connection.query(
//     'UPDATE employee SET ? WHERE ?',
//     [
//       {
//         quantity: 4
//       },

//     ],
//     function(err, res) {
//       if (err) throw err;
//       console.log(res.affectedRows + ' employee updated!\n');
//       // Call deleteProduct() AFTER the UPDATE completes
//       deleteEmployee();
//     }
//   );
//   // logs the actual query being run
//   console.log(query.sql);
// };

// readEmployee = () => {
//   console.log('Selecting all employee...\n');
//   connection.query('SELECT * FROM employee', function(err, res) {
//     if (err) throw err;
//     // Log all results of the SELECT statement
//     console.log(res);
//     connection.end();
//   });
// };

