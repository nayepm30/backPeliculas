const express = require('express');
const { obtenerPeliculas, crearPelicula, editarPelicula, eliminarPelicula } = require('../controllers/estrenoController');
const router = express.Router();

router.get('/', obtenerPeliculas); // Obtener todas las películas
router.post('/', crearPelicula); // Crear una nueva película
router.put('/:id', editarPelicula); // Editar una película
router.delete('/:id', eliminarPelicula); // Eliminar una película

module.exports = router;
