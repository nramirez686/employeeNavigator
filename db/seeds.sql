
INSERT INTO department (name) VALUES
  ('Sales'),
  ('Warehouse'),
  ('Service'),
  ('Delivery'),
  ('Credit');

INSERT INTO role (title, salary, department_id) VALUES
  ('Sales Associate', 45000.00, 1),
  ('Driver', 35000.00, 4),
  ('Manager', 50000.00, 1),
  ('Customer Service Rep', 30000.00, 3),
  ('Cashier', 30000.00, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
  ('John', 'Doe', 1, NULL),
  ('Jane', 'Smith', 3, 1),
  ('Bob', 'Johnson', 2, 1),
  ('Alice', 'Brown', 4, NULL),
  ('Eva', 'Davis', 5, 4),
  ('Tom', 'Wilson', 2, 4);
