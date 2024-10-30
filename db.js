const mysql = require('mysql2');

const connection = mysql.createConnection({
  host : "localhost",
    database : "database",
    user: "root",
    password: "root" 
});


connection.connect((err) => {
  if (err) {
    console.error('Error conectando a la base de datos:', err.stack);
    return;
  }
  console.log('Conectado a la base de datos MySQL llamada database');
  console.log('Base de datos:', connection.config.database);
});

module.exports = connection;
