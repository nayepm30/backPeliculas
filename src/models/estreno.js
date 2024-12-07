const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Importa tu conexión

const Estreno = sequelize.define('Estreno', {
  pelicula_id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  categoria: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  clasificacion: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  duracion: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  idioma: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  imagen: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  sinopsis: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Estreno;
