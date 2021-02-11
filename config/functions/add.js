// const addEmployee = () => {
//     inquirer
//         .prompt([{
//                 type: 'input',
//                 message: "What is the first name?",
//                 name: "firstName",
//             },
//             {
//                 type: "input",
//                 message: "What is the last name?",
//                 name: "lastName",
//             },
//             {
//                 type: "list",
//                 message: "What is the employee's title?",
//                 name: "title",
//                 choices: showroles
//             },
//             {
//                 type: "list",
//                 message: "Who is the employee's manager?",
//                 name: "manager",
//                 choices: showemployees,
//             }
//         ]).then((response) => {
//             // console.log(response)
//             addEmployees(response)
//         })
// }

// const addEmployees = (data) => {

//     connection.query("INSERT INTO employee SET ?", {
//         first_name: data.firstName,
//         last_name: data.lastName,
//         role_id: data.title,
//         manager_id: data.manager
//     }, (error, res) => {
//         if (error) throw error;
//     })
//     exitOrMenu();
// }

// const addDept = () => {
//     inquirer
//         .prompt([{
//             type: "input",
//             message: "What is the name of the new department?",
//             name: "name"
//         }])
//         .then((response) => {
//             // console.log(response);
//             addDepartment(response);
//         })
// }

// const addDepartment = (data) => {
//     connection.query("INSERT INTO department SET ?", {
//             name: data.name
//         },
//         (error, res) => {
//             // console.log(error, res);
//             if (error) throw error;
//         });
//     exitOrMenu();
// }


// const addRole = () => {
//     inquirer
//         .prompt([{
//                 type: "input",
//                 message: "What is the name of the new employee role?",
//                 name: "title"
//             },
//             {
//                 type: "input",
//                 message: "How much is the salary of the new role?",
//                 name: "salary"
//             },
//             {
//                 type: "list",
//                 message: "In which department is the new role?",
//                 name: "id",
//                 choices: showdepartments
//             }
//         ])
//         .then((response) => {
//             // console.log(response);
//             addEmployeeRole(response);
//         })
// }

// const addEmployeeRole = (data) => {
//     connection.query("INSERT INTO role SET ?", {
//         title: data.title,
//         salary: data.salary,
//         department_id: data.id
//     }, (error, res) => {
//         // console.log(error, res);
//         if (error) throw error;
//     });
//     exitOrMenu();
// }