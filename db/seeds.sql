-- Department
INSERT INTO department (name)
VALUES  ('Engineering'),
        ('Analytics'),
        ('Marketing'),
        ('Sales'),
        ('Finance'),
        ('Recruiting'),
        ('HR'),
        ('Legal'),
        ('Customer Support'),
        ('Executive');

-- Role
INSERT INTO role (title, salary, department_id)
VALUES  ('Software Engineer', 185000, 1),
        ('Product Manager', 165000, 1),
        ('Engineering Manager', 200000, 1)
        ('Data Engineer', 185000, 2),
        ('Data Scientist', 120000, 2),
        ('Marketing Associate', 85000, 3),
        ('Marketing Manager', 185000, 3)
        ('Brand Ambassador', 65000, 3),
        ('Account Manager', 90000, 4),
        ('Controller', 150000, 5),
        ('Chief Financial Officer', 280000, 5),
        ('Recruiter', 65000, 6),
        ('Human Resources Coordinator', 65000, 7),
        ('General Counsel', 175000, 8),
        ('Customer Support Specialist', 65000, 9);
        ('Chief Executive Officer', 300000, 10);
        ('Chief Operations Officer', 275000, 11);

-- Employee
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ('Abe', 'Smith', 1, 3),
        ('Barbara', 'Johnson', 2, 3),
        ('Ricardo', 'Garcia', 3, 10),
        ('Elizabeth', 'Perry', 4, 3),
        ('Natasha', 'Gopaul', 5, 3),
        ('Shea', 'Adams', 6, 7),
        ('Robert', 'Ansel', 7, 10),
        ('Jamie', 'Collins', 8, 7),
        ('Peter', 'Shea', 9, 11),
        ('Adam', 'Robertson', 10, 11),
        ('Karim', 'Rashid', 11, 10),
        ('Sang', 'Graham', 12, 17),
        ('Connie', 'Sherman', 13, 17),
        ('Clint', 'Carter', 14, 17),
        ('Nathaniel', 'Levy', 15, 17),
        ('Ivory', 'Leach', 16),
        ('Tabatha' 'Gates', 17, 16);






