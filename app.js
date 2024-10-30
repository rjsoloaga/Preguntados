const connection = require('./db');  // Importa la conexión

connection.query('SELECT * FROM Preguntas', (err, results) => {
  if (err) throw err;
  console.log('Preguntas:', results);
});

connection.end();  // Cierra la conexión cuando no la necesites más
