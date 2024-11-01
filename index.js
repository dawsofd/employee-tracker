// Dependencies
const { Pool } = require('pg');
const inquirer = require('inquirer');
const chalk = require('chalk');
const figlet = require('figlet');

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
  
  pool.connect((error) => {
    if (error) {
        console.log(error);
    }
    console.log(chalk.yellow.bold(`====================================================================================`));
    console.log(``);
    console.log(chalk.greenBright.bold(figlet.textSync('Employee Tracker')));
    console.log(`                                                          ` + chalk.greenBright.bold('Created By: Dawson Dohlen'));
    console.log(``);
    console.log(chalk.yellow.bold(`====================================================================================`));
    employee_tracker();
  });
  
// Inquirer Input 
var employee_tracker = function() {
    inquirer.prompt([{
       type: 'list',
       name: 'prompt',
       message: 'What would you like to do?',
       choices: ['View all departments', 'View department budget', 'Add a new department', 'View all roles', 'Add a new role', 'View all employees', 'Add a new employee', 'Update an employee role', 'Delete an employee', 'Exit']
    }]).then((answers) => {
        if (answers.prompt === 'View all departments') {
            pool.query(`SELECT department.id as department_id, department.name as department_name FROM department`, (err, {rows}) => {
                if (err) {
                    console.log(err);
                }
                console.log(chalk.yellow.bold(`====================================================================================`));
                console.log(`                              ` + chalk.green.bold(`All Departments:`));
                console.log(chalk.yellow.bold(`====================================================================================`));
                console.log(rows);
                console.log(chalk.yellow.bold(`====================================================================================`));
                employee_tracker();
            });
        } else if (answers.prompt === 'View department budget') {
            pool.query(`SELECT c.name as department_name, SUM(b.salary) as department_budget FROM employee as a JOIN role as b ON b.id = a.role_id JOIN department as c ON c.id = b.department_id GROUP BY 1 ORDER BY 1 asc`, (err, {rows}) => {
                if (err) {
                    console.log(err);
                }
                console.log(chalk.yellow.bold(`====================================================================================`));
                console.log(`                              ` + chalk.green.bold(`Budget as Combined Salaries by Department:`));
                console.log(chalk.yellow.bold(`====================================================================================`));
                console.log(rows);
                console.log(chalk.yellow.bold(`====================================================================================`));
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
                pool.query(`INSERT INTO department(name) VALUES($1)`, [answers.department], (err, result) => {
                  if (err) {
                    console.log(err);
                  }
                  console.log(``);
                  console.log(chalk.greenBright(answers.department +` Department successfully created!`));
                  console.log(``);
                  employee_tracker(); 
                });
            })
        } else if (answers.prompt === 'View all roles') {
            pool.query(`SELECT a.id as role_id, a.title as role_tile, b.name as department_name FROM role as a JOIN department as b ON b.id = a.department_id`, (err, {rows}) => {
                if (err) {
                    console.log(err);
                }
                console.log(chalk.yellow.bold(`====================================================================================`));
                console.log(`                              ` + chalk.green.bold(`Current Employee Roles:`));
                console.log(chalk.yellow.bold(`====================================================================================`));
                console.log(rows);
                employee_tracker();
            });
        } else if (answers.prompt === 'Add a new role') {
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'role',
                    prompt: 'What is the title of the new role?',
                    validate: roleInput => {
                        if (roleInput) {
                            return true;
                        } else {
                            console.log('Please add a role!');
                            return false;
                        }
                    }
                },
                {
                    type: 'input',
                    name: 'salary',
                    prompt: 'What is the salary for the new role?',
                    validate: roleInput => {
                        if (roleInput) {
                            return true;
                        } else {
                            console.log('Please add a role!');
                            return false;
                        }
                    }
                },
                {
                    type: 'input',
                    name: 'department',
                    prompt: 'What is the department_id of the new role?',
                    validate: roleInput => {
                        if (roleInput) {
                            return true;
                        } else {
                            console.log('Please add a department_id!');
                            return false;
                        }
                    }
                }
            ]).then((answers) => {
                pool.query(`INSERT INTO role (title, salary, department_id) VALUES($1, $2, $3)`, [answers.role, answers.salary, answers.department], (err, result) => {
                    if (err) {
                        console.log(err);
                    }
                    console.log(``);
                    console.log(chalk.greenBright(answers.role +` Role successfully created!`));
                    console.log(``);
                    employee_tracker();
                });
            })
        } else if (answers.prompt === 'View all employees') {
            pool.query(`SELECT a.first_name as first_name, a.last_name as last_name, b.title as role, b.salary as salary, c.name as department_name, d.first_name as manager_first_name, d.last_name as manager_last_name FROM employee as a JOIN role as b ON b.id = a.role_id JOIN department as c ON c.id = b.department_id LEFT JOIN employee as d ON d.id = a.manager_id `, (err, {rows}) => {
                if (err) {
                    console.log(err);
                }
                console.log(chalk.yellow.bold(`====================================================================================`));
                console.log(`                              ` + chalk.green.bold(`All employees:`));
                console.log(chalk.yellow.bold(`====================================================================================`));
                console.log(rows);
                employee_tracker();
            });
        } else if (answers.prompt === 'Add a new employee') {
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
                    prompt: 'What is the role of the new employee? Identify using role_id.',
                    validate: roleInput => {
                        if (roleInput) {
                            return true;
                        } else {
                            console.log('Please provide a valid role_id!');
                            return false;
                        }
                    }
                },
                {   
                    type: 'input',
                    name: 'manager',
                    prompt: 'Who manages the new employee? iIdentify using manager_id.',
                    validate: managerInput => {
                        if (managerInput) {
                            return true;
                        } else {
                            console.log('Please provide a valid manager_id!');
                            return false;
                        }
                    }
                }
            ]).then((answers) => {
                pool.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)`, [answers.firstName, answers.lastName, answers.role, answers.manager], (err, result) => {
                    if (err) {
                        console.log(err);
                    }
                    console.log(``);
                    console.log(chalk.greenBright(answers.firstName + ` successfully added!`));
                    console.log(``);
                    employee_tracker();
                });
            })
        } else if (answers.prompt === 'Update an employee role') {
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'firstName',
                    message: 'What is the first name of the employee would you like to update?',
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
                    message: 'What is the last name of the employee to update?',
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
                    message: 'What is the new role id?',
                    validate: roleInput => {
                        if (roleInput) {
                            return true;
                        } else {
                             console.log('Please provide a role id!');
                            return false;
                        }
                    }
                },
                {
                    type: 'input',
                    name: 'manager',
                    message: 'What is the updated manager id?',
                    validate: roleInput => {
                        if (roleInput) {
                            return true;
                        } else {
                             console.log('Please provide a manager id!');
                            return false;
                        }
                    }
                }
                ]).then((answers) => {
                    pool.query(`UPDATE employee SET role_id = $1, manager_id = $2 WHERE first_name = $3 AND last_name = $4`, [answers.role, answers.manager, answers.firstName, answers.lastName], (err, result) => {
                        if (err) {
                            console.log(err);
                        }
                        console.log(``);
                        console.log(chalk.greenBright(answers.firstName + `'s role updated!`));
                        console.log(``);
                        employee_tracker();
        
                    });
                })
            } else if (answers.prompt === 'Delete an employee') {
                inquirer.prompt([
                    {
                        type: 'input',
                        name: 'firstName',
                        message: 'What is the first name of the employee to delete?',
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
                        message: 'What is the last name of the employee to delete?',
                        validate: lastNameInput => {
                            if (lastNameInput) {
                                return true;
                            } else {
                                 console.log('Please provide a last name!');
                                return false;
                            }
                        }
                    }
                    ]).then((answers) => {
                        pool.query(`DELETE FROM employee WHERE first_name = $1 AND last_name = $2`, [answers.firstName, answers.lastName], (err, result) => {
                            if (err) {
                                console.log(err);
                            }
                            console.log(``);
                            console.log(chalk.greenBright(answers.firstName + ` deleted!`));
                            console.log(``);
                            employee_tracker();
        
                    });
                })
            } else if (answers.prompt === 'Exit') {
                pool.end();
                console.log("Good Bye!");
            }
        })
    };
