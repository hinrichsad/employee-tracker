const inquirer = require('inquirer');
// const connection = require('./connection')
// const add = require('./functions/add');
// const view = require('./functions/view');
// const update = require('./functions/update');


const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'password',
    database: 'employee_db',
});



connection.connect((err) => {
    if(err) throw err;
    console.log(`connected as id ${connection.threadID}\n` );

connection.query("SELECT * FROM employee_role", (err, res) => {
    if (err) throw err;

    displayRoles = res.map(role => ({name: role.title, value: role.id}))
})
connection.query("SELECT * FROM employee", (err, res) => {
    if (err) throw err;

    displayEmployees = res.map(employee => ({first_name: employee.first_name, last_name: employee.last_name, value: employee.id}))
})
connection.query("SELECT * FROM department", (err, res) => {
    if (err) throw err;

    displayDepartments = res.map(department => ({name: department.dept_name, value: department.id}))
})

})


const employeeTracker = () => {
    inquirer
        .prompt({
            name: 'action',
            type: 'list',
            message: 'What action would you like to take?',
            choices: [{
                    name: 'Add employee',
                    value: 'addEmployee'
                },
                {
                    name: 'Add department',
                    value: 'addDepartment'
                },
                {
                    name: 'Add role',
                    value: 'addRole'
                },
                {
                    name: 'View all employees',
                    value: 'viewEmployees'
                },
                {
                    name: 'View all departments',
                    value: 'viewDepartments'
                },
                {
                    name: 'View all roles',
                    value: 'viewRoles'
                },
                {
                    name: 'Update role',
                    value: 'updateRole'
                },
                {
                    name: 'Exit',
                    value: 'exit'
                }
            ],
        })
        .then((res) => {
            console.log(res.action)
            menu(res.action);
        });
};

const menu = (option) => {
    switch (option) {
        case 'addEmployee':
            addEmployee();
            break;
        case 'addDepartment':
            addDept();
            break;
        case 'addRole':
            addRole();
            break;
        case 'viewEmployees':
            viewEmployees();
            break;
        case 'viewDepartments':
            viewDepartments();
            break;
        case 'viewRoles':
            viewRoles();
            break;
        case 'updateRole':
            updateRole();
            break;
        case 'exit':
            exit();
            break;
    }
}

const addEmployee = () => {
    inquirer
        .prompt([{
                type: 'input',
                message: "What is the first name?",
                name: "firstName",
            },
            {
                type: "input",
                message: "What is the last name?",
                name: "lastName",
            },
            {
                type: "list",
                message: "What is the employee's title?",
                name: "title",
                choices: displayRoles
            },
            {
                type: "list",
                message: "Who is the employee's manager?",
                name: "manager",
                choices: displayEmployees,
            }
        ]).then((response) => {
            // console.log(response)
            addEmployees(response)
        })
}

const addEmployees = (data) => {

    connection.query("INSERT INTO employee SET ?", {
        first_name: data.firstName,
        last_name: data.lastName,
        role_id: data.title,
        manager_id: data.manager
    }, (error, res) => {
        if (error) throw error;
    })
    exitOrMenu();
}

const addDept = () => {
    inquirer
        .prompt([{
            type: "input",
            message: "What is the name of the new department?",
            name: "name"
        }])
        .then((response) => {
            console.log(response.name);
            addDepartment(response.name);
        })
}

const addDepartment = (data) => {
    connection.query("INSERT INTO department SET ?", {
            dept_name: data
        },
        (error, res) => {
            // console.log(error, res);
            if (error) throw error;
        });
    employeeTracker();
}


const addRole = () => {
    inquirer
        .prompt([{
                type: "input",
                message: "What is the name of the new employee role?",
                name: "title"
            },
            {
                type: "input",
                message: "How much is the salary of the new role?",
                name: "salary"
            },
            {
                type: "list",
                message: "In which department is the new role?",
                name: "id",
                choices: displayDepartments
            }
        ])
        .then((response) => {
            console.log(response);
            addEmployeeRole(response);
        })


}

const addEmployeeRole = (data) => {
    connection.query("INSERT INTO role SET ?", {
        title: data.title,
        salary: data.salary,
        dept_id: data.id
    }, (error, res) => {
        // console.log(error, res);
        if (error) throw error;
    });
    employeeTracker();
}

const updateRole = () => {
    inquirer
        .prompt([{
                type: "list",
                message: "Which employee role would you like to update?  ",
                name: "empID",
                choices: displayEmployees
            },
            {
                type: "list",
                message: "New role?  ",
                name: "titleID",
                choices: displayRoles
            }
        ])
        .then(function (response) {
            // console.log(response);
            updateEmployeeRole(response);
        })
}

const updateEmployeeRole = (data) => {
    connection.query(`UPDATE employee SET role_id = ${data.titleID} WHERE id = ${data.empID}`,
        function (error, res) {
            // console.log(error, res);
            if (error) throw error;
        });
        employeeTracker();
}


const viewEmployees = () => {
    connection.query("SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;", (error, res) => {
        console.table(res);
        employeeTracker();
    })
}

const viewDepartments = () => {
    console.log("view all departments")
    connection.query("SELECT * from department", (error, res) => {
        console.table(res);
        employeeTracker();
    })
}

const viewRoles = () => {
    connection.query("SELECT * from role", (error, res) => {
        console.table(res);
        employeeTracker();
    })
}

const exit = () => {
    console.log("Thank you for using Employee Tracker!");
    connection.end();
    process.exit();
}




employeeTracker();