const pool = require('../config/db');

// Obtener todas las películas
const obtenerPeliculas = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM pelicula');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las películas', error });
  }
};

// Crear una nueva película
const crearPelicula = async (req, res) => {
  const { categoria, clasificacion, duracion, idioma, imagen, nombre, sinopsis } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO pelicula (categoria, clasificacion, duracion, idioma, imagen, nombre, sinopsis) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [categoria, clasificacion, duracion, idioma, imagen, nombre, sinopsis]
    );
    res.json({ message: 'Película creada exitosamente', peliculaId: result.insertId });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la película', error });
  }
};

// Editar una película existente
const editarPelicula = async (req, res) => {
  const { id } = req.params;
  const { categoria, clasificacion, duracion, idioma, imagen, nombre, sinopsis } = req.body;
  try {
    await pool.query(
      'UPDATE pelicula SET categoria = ?, clasificacion = ?, duracion = ?, idioma = ?, imagen = ?, nombre = ?, sinopsis = ? WHERE pelicula_id = ?',
      [categoria, clasificacion, duracion, idioma, imagen, nombre, sinopsis, id]
    );
    res.json({ message: 'Película actualizada exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar la película', error });
  }
};

// Eliminar una película
const eliminarPelicula = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM pelicula WHERE pelicula_id = ?', [id]);
    res.json({ message: 'Película eliminada exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la película', error });
  }
};

module.exports = { obtenerPeliculas, crearPelicula, editarPelicula, eliminarPelicula };
