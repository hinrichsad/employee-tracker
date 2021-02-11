// const updateRole = () => {
//     inquirer
//         .prompt([{
//                 type: "list",
//                 message: "For which employee would you like to update the role?",
//                 name: "empID",
//                 choices: showemployees
//             },
//             {
//                 type: "list",
//                 message: "What is the employee's new role?",
//                 name: "titleID",
//                 choices: showroles
//             }
//         ])
//         .then(function (response) {
//             // console.log(response);
//             updateEmployeeRole(response);
//         })
// }

// const updateEmployeeRole = (data) => {
//     connection.query(`UPDATE employee SET role_id = ${data.titleID} WHERE id = ${data.empID}`,
//         function (error, res) {
//             // console.log(error, res);
//             if (error) throw error;
//         });
//         exitOrMenu();
// }