const mysql = require('mysql2/promise');

// Crear una conexión con la base de datos
const pool = mysql.createPool({
  host: 'utpolis-bd-do-user-17863068-0.g.db.ondigitalocean.com',
  user: 'doadmin',
  password: 'AVNS_JIB4wAgQdb0dIcjKeWT',
  database: 'utpolis',
  port: 25060,
  ssl: {
    rejectUnauthorized: true,
  },
});

module.exports = pool;
