const express = require('express');
const cors = require('cors'); // importamos cors que no que es un mecanismo de seguridad
const connection = require('./db'); 
const app = express();

// habilitamos cors
app.use(cors({
    origin: 'http://127.0.0.1:5500', //aca tendriamos que cambiar para conectar a la base de datos de katona
    methods: ['GET', 'POST'], 
    allowedHeaders: ['Content-Type'], 
}));

app.use(express.json()); 


app.post('/register', (req, res) => {
  const { nickname, correo } = req.body; 

  if (!nickname || !correo) {
    return res.status(400).json({ success: false, message: 'Nickname y correo son requeridos' });
  }

  const query = 'INSERT INTO usuario (nickname, correo, ranking) VALUES (?, ?, 0)';
  const ranking = 0; // aca le pasamos como ranking 0 porque recien comienza

  connection.query(query, [nickname, correo, ranking], (err, results) => {
    if (err) {
      console.error('Error al registrar el usuario:', err.stack);
      return res.status(500).json({ success: false, message: 'Error al intentar registrar el usuario' });
    }
    res.status(201).json({ success: true, message: 'Usuario registrado exitosamente' });
  });
});


// para obtener el historial o el ranking
app.get('/historico', (req, res) => {
  const query = 'SELECT nickname, ranking FROM usuario ORDER BY ranking DESC LIMIT 10';
  
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error al obtener el historial:', err.stack);
      return res.status(500).json({ success: false, message: 'Error al obtener el historial' });
    }
    res.json({ success: true, data: results });
  });
});




// iniciamos el server
app.listen(5500, () => {
  console.log('Servidor corriendo en el puerto 5500');
});




