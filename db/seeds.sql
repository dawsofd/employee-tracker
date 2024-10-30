DO $$
  DECLARE
      -- Any variable declarations would go here
  BEGIN

-- Department
INSERT INTO department (id, name)
VALUES  (1, 'Engineering'),
        (2, 'Analytics'),
        (3, 'Marketing'),
        (4, 'Sales'),
        (5, 'Finance'),
        (6, 'Recruiting'),
        (7, 'HR'),
        (8, 'Legal'),
        (9, 'Customer Support'),
        (10, 'Executive');

-- Role
INSERT INTO role (id, title, salary, department_id)
VALUES  (101, 'Software Engineer', 185000, 1),
        (102, 'Product Manager', 165000, 1),
        (103, 'Engineering Manager', 200000, 1),
        (104, 'Data Engineer', 185000, 2),
        (105, 'Data Scientist', 120000, 2),
        (106, 'Marketing Associate', 85000, 3),
        (107, 'Marketing Manager', 185000, 3),
        (108, 'Brand Ambassador', 65000, 3),
        (109, 'Account Manager', 90000, 4),
        (110, 'Controller', 150000, 5),
        (111, 'Chief Financial Officer', 280000, 5),
        (112, 'Recruiter', 65000, 6),
        (113, 'Human Resources Coordinator', 65000, 7),
        (114, 'General Counsel', 175000, 8),
        (115, 'Customer Support Specialist', 65000, 9),
        (116, 'Chief Executive Officer', 300000, 10),
        (117, 'Chief Operations Officer', 275000, 10);

-- Employee
INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES  (1001, 'Abe', 'Smith', 101, 1003),
        (1002, 'Barbara', 'Johnson', 102, 1003),
        (1003, 'Ricardo', 'Garcia', 103, 1016),
        (1004, 'Elizabeth', 'Perry', 104, 1003),
        (1005, 'Natasha', 'Gopaul', 105, 1003),
        (1006, 'Shea', 'Adams', 106, 1007),
        (1007, 'Robert', 'Ansel', 107, 1010),
        (1008, 'Jamie', 'Collins', 108, 1007),
        (1009, 'Peter', 'Shea', 109, 1011),
        (1010, 'Adam', 'Robertson', 110, 1011),
        (1011, 'Karim', 'Rashid', 111, 1016),
        (1012, 'Sang', 'Graham', 112, 1017),
        (1013, 'Connie', 'Sherman', 113, 1017),
        (1014, 'Clint', 'Carter', 114, 1017),
        (1015, 'Nathaniel', 'Levy', 115, 1017),
        (1016, 'Ivory', 'Leach', 116, NULL),
        (1017, 'Tabatha', 'Gates', 117, 1016);

EXCEPTION
    WHEN OTHERS THEN
        RAISE NOTICE 'An error occurred: %', SQLERRM; -- Log the error
        ROLLBACK; -- Explicitly roll back changes in case of error
END $$;






