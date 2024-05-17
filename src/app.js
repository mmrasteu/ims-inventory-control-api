const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

// Inicializar Express
const app = express();

//CORS

// Configurar el middleware body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configurar la conexión a la base de datos MongoDB
const db = require("./app/models");

console.log(db.url);

db.mongoose
  .connect(db.url)
  .then(() => {
    console.log("Conexión realizada con éxito");
  })
  .catch(err => {
    console.log("No se pudo conectar a la base de datos", err);
    process.exit();
  });

// Definir las rutas de la API
app.get('/api/status', (req,res) => {
  res.status(200).send({
      "message": "API corriendo...",
      "status": 200
  });
});
const inventoryRoutes = require('./app/routes/inventory.routes');
app.use('/api', inventoryRoutes);

// Manejar rutas no encontradas
app.use((req, res, next) => {
  const error = new Error('Ruta no encontrada');
  error.status = 404;
  next(error);
});

// Manejar errores
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

// Iniciar el servidor
const PORT = process.env.NODE_DOCKER_PORT || 8080;
app.listen(PORT, () => {
  console.log(`Servidor funcionando en  ${PORT}.`);
});