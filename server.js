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

// Inquirer 

var employee_tracker = function() {
    inquirer.prompt([{
       type: 'list',
       name: 'prompt',
       message: 'What would you like to do?',
       choices: ['View all departments', 'View all roles']
    }])
}