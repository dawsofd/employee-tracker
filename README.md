# 12 SQL: Employee Tracker
UCB-VIRT-FSF-PT-07-2024-U-LOLC homework assignment #12

## User Story

```md
AS A business owner
I WANT to be able to view and manage the departments, roles, and employees in my company
SO THAT I can organize and plan my business
```

## Acceptance Criteria

```md
GIVEN a command-line application that accepts user input
WHEN I start the application
THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
WHEN I choose to view all departments
THEN I am presented with a formatted table showing department names and department ids
WHEN I choose to view all roles
THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
WHEN I choose to view all employees
THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
WHEN I choose to add a department
THEN I am prompted to enter the name of the department and that department is added to the database
WHEN I choose to add a role
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
WHEN I choose to add an employee
THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
WHEN I choose to update an employee role
THEN I am prompted to select an employee to update and their new role and this information is updated in the database 
```

## Mock-Up

The following video shows an example of the application being used from the command line:

[![A video thumbnail shows the command-line employee management application with a play button overlaying the view.](./Assets/12-sql-homework-video-thumbnail.png)](https://2u-20.wistia.com/medias/2lnle7xnpk)

## Application Preview
![Walkthrough Video GIF](./Assets/employee-tracker-walkthrough.gif)

## Walkthrough Video

![Link to application walkthrough video](https://drive.google.com/file/d/1uMWGN8TZsPXI-0TnMoI7hho89AAF-A2O/view)

## Installation 

```
npm init -y
npm install inquirer@8.2.4
npm install pg
npm install chalk@4.1.2
npm install figlet
```

## Usage

To load data, run the following command in Assets/db directory: 

```
psql -U postgres
```

Once connected to the postgres server, run the following commands to create and seed the database:

```
\i schema.sql
\i seeds.sql

To run the application, navigate back to the the parent directory and run:

```
node index.js
```