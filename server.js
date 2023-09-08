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
  console.log("---- manager application ----")
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
      handleUserSelection();

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

function addRole() {}

function addDepartment() {}

function updateEmployeeRole() {}

promptUser();
