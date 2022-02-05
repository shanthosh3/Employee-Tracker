USE sql_db;

INSERT INTO department(name)
VALUES
('Engineering'),
('Sales'),
('CyberSecurity'),
('IT');

INSERT INTO roles(title, salary, department_id)
VALUES
('Doctor', 127000, 1),
('Inside Sales', 45000, 2),
('Cyber Security Analyst', 1150000, 3),
('Developer', 1100000, 4);

INSERT INTO employees( first_name, last_name, roles_id)
VALUES
('Guy' ,'Might', '1'),
('Naruto' ,'Uzumaki', '2'),
('Sasuke' ,'Uchiha', '3'),
('Madara' ,'Uchiha', '4'),
('Kakashi' ,'Hatake', '2'),
('Hagoromo' ,'Otsuski', '1'),
('Hashirama' ,'Senju', '2'),
('Hinata' ,'Naruto', '3');
