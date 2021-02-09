const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    PORT: 8080,
    user: 'root',

    password: 'password',
    batabase: 'employee_db',
})

connection.connect((err) => {
    if(err) throw err;

    console.log(`Listening on port ${connection.PORT}\n`);
    console.log(`Connected as id ${connection.threadID}\n`);
});