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
INSERT INTO role (title, salary, department_id)
VALUES  ('Software Engineer', 185000, 1),
        ('Product Manager', 165000, 1),
        ('Engineering Manager', 200000, 1),
        ('Data Engineer', 185000, 2),
        ('Data Scientist', 120000, 2),
        ('Marketing Associate', 85000, 3),
        ('Marketing Manager', 185000, 3),
        ('Brand Ambassador', 65000, 3),
        ('Account Manager', 90000, 4),
        ('Controller', 150000, 5),
        ('Chief Financial Officer', 280000, 5),
        ('Recruiter', 65000, 6),
        ('Human Resources Coordinator', 65000, 7),
        ('General Counsel', 175000, 8),
        ('Customer Support Specialist', 65000, 9),
        ('Chief Executive Officer', 300000, 10),
        ('Chief Operations Officer', 275000, 10);

-- Employee
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ('Abe', 'Smith', 101, 1003),
        ('Barbara', 'Johnson', 102, 1003),
        ('Ricardo', 'Garcia', 103, 1010),
        ('Elizabeth', 'Perry', 104, 1003),
        ('Natasha', 'Gopaul', 105, 1003),
        ('Shea', 'Adams', 106, 1007),
        ('Robert', 'Ansel', 107, 1010),
        ('Jamie', 'Collins', 108, 1007),
        ('Peter', 'Shea', 109, 1011),
        ('Adam', 'Robertson', 110, 1011),
        ('Karim', 'Rashid', 111, 1010),
        ('Sang', 'Graham', 112, 1017),
        ('Connie', 'Sherman', 113, 1017),
        ('Clint', 'Carter', 114, 1017),
        ('Nathaniel', 'Levy', 115, 1017),
        ('Ivory', 'Leach', 116, NULL),
        ('Tabatha', 'Gates', 117, 1016);

EXCEPTION
    WHEN OTHERS THEN
        RAISE NOTICE 'An error occurred: %', SQLERRM; -- Log the error
        ROLLBACK; -- Explicitly roll back changes in case of error
END $$;






