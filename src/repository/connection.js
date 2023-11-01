import mysql from 'mysql2/promise'

const connection = await mysql.createConnection({
    host: process.env.HOST,
    database: process.env.DB,
    user: process.env.USER,
    password: process.env.PWD

});
console.log('Banco de dados vinculado');
export {connection};