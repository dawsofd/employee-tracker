// Dependencies
const { Pool } = require('pg');
const inquirer = require('inquirer');

// DB Connection 
const pool = new Pool(
    {
      // Enter PostgreSQL username
      user: 'postgres',
      // Enter PostgreSQL password
      password: '',
      host: 'localhost',
      database: 'employees_db'
  },
  console.log('Connected to the employees_db database!')
  )
  
  pool.connect();
  
// Inquirer Input 
var employee_tracker = function() {
    inquirer.prompt([{
       type: 'list',
       name: 'prompt',
       message: 'What would you like to do?',
       choices: ['View all departments', 'View department budget', 'Add a new department', 'View all roles', 'Add a new role', 'View all employees', 'Add a new employee', 'Update an employee role', 'Delete an employee', 'Exit']
    }]).then((answers) => {
        if (answers.prompt === 'View all departments') {
            pool.query(`SELECT * FROM department`, (err,result) => {
                if (err) {
                    console.log(err);
                }
                console.log("Showing all departments: ");
                console.table(result);
                employee_tracker();
            });
        } else if (answers.prompt === 'View department budget') {
            pool.query(`SELECT c.name as department_name, SUM(b.salary) as combined_salaries FROM employee as a JOIN role as b ON b.id = a.role_id JOIN department as c ON c.id = b.department_id GROUP BY 1 ORDER BY 1 asc`, (err, result) => {
                if (err) {
                    console.log(err);
                }
                console.log("Showing combined salaries by department: ");
                console.table(result);
                employee_tracker();
            });
        } else if (answers.prompt === 'Add a new department') {
            inquirer.prompt([{
                type: 'input',
                name: 'department',
                prompt: 'What is the name of the new department?',
                validate: departmentInput => {
                    if (departmentInput) {
                        return true;
                    } else {
                        console.log('Please add a department!');
                        return false;
                    }
                }
            }]).then((answers) => {
                pool.query(`INSERT INTO department (name) VALUES (?)`, [answers.department], (err, result) => {
                  if (err) {
                    console.log(err);
                  }
                  console.log(`Added ${answers.department} to the datbase.`) 
                  employee_tracker(); 
                });
            })
        } else if (answers.prompt === 'View all roles') {
            pool.query(`SELECT * FROM role`, (err, result) => {
                if (err) {
                    console.log(err);
                }
                console.log("Showing all roles: ");
                console.table(result);
                employee_tracker();
            });
        } else if (answers.prompt === 'Add a new role') {
            inquirer.prompt([{
                type: 'input',
                name: 'role',
                prompt: 'What is the name of the new role?',
                validate: roleInput => {
                    if (roleInput) {
                        return true;
                    } else {
                        console.log('Please add a role!');
                        return false;
                    }
                }
            }]).then((answers) => {
                pool.query(`INSERT INTO roles (name) VALUES (?)`, [answers.role], (err, result) => {
                    if (err) {
                        console.log(err);
                    }
                    console.log(`Added ${answers.role} to the datbase.`)
                    employee_tracker();
                });
            })
        } else if (answers.prompt === 'View all employees') {
            pool.query(`SELECT * FROM employee`, (err, result) => {
                if (err) {
                    console.log(err);
                }
                console.log("Showing all employees: ");
                console.table(result);
                employee_tracker();
            });
        } else if (answers.prompt === 'Add a new employee') {
            pool.query(`SELECT * FROM employee as a JOIN role as b ON b.id = a.role_id`, (err, result) => {
                if (err) {
                    console.log(err);
                }
                inquirer.prompt([
                    {
                        type: 'input',
                        name: 'firstName',
                        prompt: 'What is the first name of the new employee?',
                        validate: firstNameInput => {
                            if (firstNameInput) {
                                return true;
                            } else {
                                console.log('Please provide a first name!');
                                return false;
                            }
                        }
                    },
                    {
                        type: 'input',
                        name: 'lastName',
                        prompt: 'What is the last name of the new employee?',
                        validate: lastNameInput => {
                            if (lastNameInput) {
                                return true;
                            } else {
                                console.log('Please provide a last name!');
                                return false;
                            }
                        }
                    },
                    {   
                        type: 'input',
                        name: 'role',
                        prompt: 'What is the role of the new employee?',
                        validate: roleInput => {
                            if (roleInput) {
                                return true;
                            } else {
                                console.log('Please provide a role!');
                                return false;
                            }
                        }
                    },
                    {   
                        type: 'input',
                        name: 'manager',
                        prompt: 'Who manages the new employee?',
                        validate: managerInput => {
                            if (managerInput) {
                                return true;
                            } else {
                                console.log('Please provide a manager!');
                                return false;
                            }
                        }
                    }
                ]).then((answers) => {
                    for (var i=0; i < result.length; i++) {
                        if (result[i].title === answers.role) {
                            var role = result[i];
                        }
                    }
                    pool.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`, [answers.firstName, answers.lastName, role.id, answers.manager.id], (err, result) => {
                        if (err) {
                            console.log(err);
                        }
                        console.log(`Added ${answers.firstName} ${answers.lastName} to the database.`)
                        employee_tracker();
                    });
                })
            });
        } else if (answers.prompt === 'Update an employee role') {
            pool.query(`SELECT * FROM employee as a JOIN role as b ON b.id = a.role_id`, (err, result) => {
                if (err) {
                    console.log(err);
                }
                inquirer.prompt([
                    {
                        type: 'list',
                        name: 'employee',
                        message: 'Which employee would you like to update?',
                        choices: () => {
                            var array = [];
                            for (var i = 0; i < result.length; i++) {
                                array.push(result[i].last_name);
                            }
                            var employeeArray = [...new Set(array)];
                            return employeeArray;
                        }
                    },
                    {
                        type: 'list',
                        name: 'role',
                        message: 'What is the new role?',
                        choices: () => {
                            var array = [];
                            for (var i=0; i < result.length; i++) {
                                array.push(result[i].title);
                            }
                            var newArray = [...new Set(array)];
                            return newArray;
                        }
                    }
                ]).then((answers) => {
                    for (var i = 0; i < result.length; i++) {
                        if (result[i].last_name === answers.employee) {
                            var name = result[i];
                        }
                    }

                    for (var i=0; i < result.length; i++) {
                        if (result[i].title === answers.role) {
                            var role = result[i];
                        }
                    }

                    pool.query(`UPDATE employee SET ? WHERE ?`, [{role_id: role}, {last_name: name}], (err, result) => {
                        if (err) {
                            console.log(err);
                        }
                        console.log(`Updated ${answers.employee} role!`)
                        employee_tracker();
                    });
                })
            });
        } else if (answers.prompt === 'Exit') {
            pool.end();
            console.log("Good Bye!");
        }
    })
};

employee_tracker();
