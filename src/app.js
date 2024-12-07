// server.js
const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 7002;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Configurar conexión a la base de datos
// Configurar conexión a la base de datos
const db = mysql.createPool({
    host: 'utpolis-bd-do-user-17863068-0.g.db.ondigitalocean.com',
    user: 'doadmin',
    password: 'AVNS_JIB4wAgQdb0dIcjKeWT',
    database: 'utpolis',
    port: 25060
});

// Verificar conexión
db.getConnection((err) => {
  if (err) {
    console.error('Error conectando a la base de datos:', err);
  } else {
    console.log('Conectado a la base de datos');
  }
});

// Rutas
app.get('/', (req, res) => {
  res.send('Microservicio de Películas funcionando.');
});

// CRUD para la tabla `pelicula`

// Obtener todas las películas
app.get('/peliculas', (req, res) => {
  db.query('SELECT * FROM pelicula', (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Error al obtener películas' });
    } else {
      res.json(results);
    }
  });
});

// Buscar una película por su ID
app.get('/peliculas/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM pelicula WHERE pelicula_id = ?';
  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Error al buscar la película' });
    } else if (results.length === 0) {
      res.status(404).json({ message: 'Película no encontrada' });
    } else {
      res.json(results[0]); // Devolvemos solo el primer resultado si hay una película con ese ID
    }
  });
});

// Agregar una nueva película
app.post('/peliculas', (req, res) => {
  const { categoria, clasificacion, duracion, idioma, imagen, nombre, sinopsis } = req.body;
  const sql = 'INSERT INTO pelicula (categoria, clasificacion, duracion, idioma, imagen, nombre, sinopsis) VALUES (?, ?, ?, ?, ?, ?, ?)';
  db.query(sql, [categoria, clasificacion, duracion, idioma, imagen, nombre, sinopsis], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Error al agregar película' });
    } else {
      res.json({ message: 'Película añadida con éxito', id: results.insertId });
    }
  });
});

// Actualizar una película
app.put('/peliculas/:id', (req, res) => {
  const { id } = req.params;
  const { categoria, clasificacion, duracion, idioma, imagen, nombre, sinopsis } = req.body;
  const sql = 'UPDATE pelicula SET categoria = ?, clasificacion = ?, duracion = ?, idioma = ?, imagen = ?, nombre = ?, sinopsis = ? WHERE pelicula_id = ?';
  db.query(sql, [categoria, clasificacion, duracion, idioma, imagen, nombre, sinopsis, id], (err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Error al actualizar película' });
    } else {
      res.json({ message: 'Película actualizada con éxito' });
    }
  });
});

// Eliminar una película
app.delete('/peliculas/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM pelicula WHERE pelicula_id = ?';
  db.query(sql, [id], (err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Error al eliminar película' });
    } else {
      res.json({ message: 'Película eliminada con éxito' });
    }
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
