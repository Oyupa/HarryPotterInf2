const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',  // Reemplaza con tu contraseña de MySQL
    database: 'harrypotter'
});

connection.connect((err) => {
    if (err) {
        console.error('Error al conectar a MySQL:', err);
    } else {
        console.log('Conectado a MySQL (harrypotter)');
    }
});

module.exports = connection;
