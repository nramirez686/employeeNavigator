const inquirer = require("inquirer");
const mysql = require("mysql2");
const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "password",
    database: "department_db",
  },
  console.log(`Connected to departments_db database.`),
  console.log("---- Manager Application ----")
);

function promptUser() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "action",
        message: "What would you like to do?",
        choices: [
          "View All Employees",
          "Add Employee",
          "Update Employee Role",
          "View All Roles",
          "Add Role",
          "View All Departments",
          "Add Department",
          "Quit",
        ],
        loop: true,
      },
    ])
    .then((answers) => {
      const selectedAction = answers.action;
      if (selectedAction === "View All Employees") {
        viewAllEmployees();
      } else if (selectedAction === "Add Employee") {
        addEmployee();
      } else if (selectedAction === "Update Employee Role") {
        updateEmployeeRole();
      } else if (selectedAction === "View All Roles") {
        viewAllRoles();
      } else if (selectedAction === "Add Role") {
        addRole();
      } else if (selectedAction === "View All Departments") {
        viewAllDepartments();
      } else if (selectedAction === "Add Department") {
        addDepartment();
      } else if (selectedAction === "Quit") {
        console.log("Exiting the application.");
      } else {
        console.log("Invalid choice.");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function viewAllEmployees() {
  db.query("SELECT * FROM employee", function (err, results) {
    if (err) {
      console.error("Error with database:", err);
      return;
    }
    console.log("\nAll Employees:\n");
    results.forEach((employee) => {
      console.log(`Employee ID: ${employee.id}`);
      console.log(`First Name: ${employee.first_name}`);
      console.log(`Last Name: ${employee.last_name}`);
      console.log(`Role ID: ${employee.role_id}`);
      console.log(`Manager ID: ${employee.manager_id}`);
    });
    promptUser();
  });
}

function viewAllRoles() {
  db.query("SELECT * FROM role", function (err, results) {
    if (err) {
      console.error("Error with database", err);
      return;
    }
    console.log("\nAll Roles:\n");
    results.forEach((role) => {
      console.log(`ID: ${role.id}`);
      console.log(`Title: ${role.title}`);
      console.log(`Salary: ${role.salary}`);
      console.log(`Department: ${role.department_id}`);
    });
    promptUser();
  });
}

function viewAllDepartments() {
  db.query("SELECT * FROM department", function (err, results) {
    if (err) {
      console.error("Error with database", err);
      return;
    }
    console.log("\nAll Departments:\n");
    results.forEach((department) => {
      console.log(`ID: ${department.id}`);
      console.log(`Name: ${department.name}`);
    });
    promptUser();
  });
}

function addEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "first_name",
        message: "Enter the first name of the employee:",
      },
      {
        type: "input",
        name: "last_name",
        message: "Enter the last name of the employee:",
      },
      {
        type: "input",
        name: "role_id",
        message: "Enter the role ID for the employee:",
      },
      {
        type: "input",
        name: "manager_id",
        message: "Enter the manager ID for the employee (if applicable):",
        default: null,
      },
    ])
    .then((answers) => {
      const { first_name, last_name, role_id, manager_id } = answers;
      const query =
        "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)";
      db.query(
        query,
        [first_name, last_name, role_id, manager_id],
        (err, results) => {
          if (err) {
            console.error("Error adding employee:", err);
          } else {
            console.log("Employee added successfully!");
          }
          promptUser();
        }
      );
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function addRole() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "title",
        message: "Enter the title of the role:",
      },
      {
        type: "input",
        name: "salary",
        message: "Enter the salary:",
      },
      {
        type: "input",
        name: "department_id",
        message: "Enter the department ID for the role:",
      },
    ])
    .then((answers) => {
      const { title, salary, department_id } = answers;
      const query =
        "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)";
      db.query(query, [title, salary, department_id], (err, results) => {
        if (err) {
          console.error("Error adding role:", err);
        } else {
          console.log("Role added successfully!");
        }
        promptUser();
      });
    })
    .catch((error) => {
      console.error("Error:", error);
      promptUser();
    });
}

function addDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "Enter the name of the department:",
      },
    ])
    .then((answers) => {
      const { name } = answers;
      const query = "INSERT INTO department (name) VALUES (?)";
      db.query(query, [name], (err, results) => {
        if (err) {
          console.error("Error adding department:", err);
        } else {
          console.log("Department added successfully!");
        }
        promptUser();
      });
    })
    .catch((error) => {
      console.error("Error:", error);
      promptUser();
    });
}

function updateEmployeeRole() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "employeeId",
        message: "Enter the ID of the employee you want to update:",
      },
      {
        type: "input",
        name: "newRoleId",
        message: "Enter the new role ID for the employee:",
      },
    ])
    .then((answers) => {
      const { employeeId, newRoleId } = answers;
      const query = "UPDATE employee SET role_id = ? WHERE id = ?";
      db.query(query, [newRoleId, employeeId], (err, results) => {
        if (err) {
          console.error("Error updating employee role:", err);
        } else {
          console.log("Employee role updated successfully!");
        }
        promptUser();
      });
    })
    .catch((error) => {
      console.error("Error:", error);
      promptUser();
    });
}

promptUser();
