const mysql = require('mysql2');
require('dotenv').config();

console.log('password',process.env.DB_PASSWORD);

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,  
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// console.log('connection', connection);

// await connection.connect(function(err){
//     if(err){
// console.log("Ocurrio un error al connectar a la base de datos", err);
//     }else{
//         console.log('Base de datos connectada');
//     }
// });

module.exports = connection;