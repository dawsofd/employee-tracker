//  Dependencies
const express = require('express');

// Import and require Pool
const { Pool } = require('pg');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

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

// Query database
pool.query('SELECT * FROM employee', function (err, {rows}) {
    console.log(rows);
  });
  
  // Default response for any other request (Not Found)
  app.use((req, res) => {
    res.status(404).end();
  });
  
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

// Inquirer Input 
var employee_tracker = function() {
    inquirer.prompt([{
       type: 'list',
       name: 'prompt',
       message: 'What would you like to do?',
       choices: ['View all departments', 'View department budget', 'Add a new department', 'View all roles', 'Add a new role', 'View all employees', 'Add an employee', 'Update an employee role', 'Delete an employee', 'Exit']
    }]).then((answers) => {
        if (answers.prompt === 'View all departments') {
            pool.query(`SELECT * FROM department`, (err,result) => {
                if (err) throw err;
                console.log("Showing all departments: ");
                console.table(result);
                employee_tracker();
            });
        } else if (answers.prompt === 'View department budget') {
            pool.query(`SELECT c.name as department_name, SUM(b.salary) as combined_salaries FROM employee as a JOIN role as b ON b.id = a.role_id JOIN department as c ON c.id = b.department_id GROUP BY 1 ORDER BY 1 asc`, (err, result) => {
                if (err) throw err;
                console.log("Showing combined salaries by department: ");
                console.table(result);
                employee_tracker();
            });
        } else if (answers.prompt === 'Add a new department') {
            inqurier.prompt([{
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
                  if (err) throw err;
                  console.log(`Added ${answers.department} to the datbase.`) 
                  employee_tracker(); 
                });
            })
        } else if (answers.prompt === 'View all roles') {
            pool.query(`SELECT * FROM role`, (err, result) => {
                if (err) throw err;
                console.log("Showing all roles: ");
                console.table(result);
                employee_tracker();
            });
        } else if (answers.prompt === 'Exit') {
            pool.end();
            console.log("Good Bye!");
        }
    })
};
