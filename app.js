const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

// Inicializar Express
const app = express();

// Configurar el middleware body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configurar la conexión a la base de datos MongoDB
const MONGODB_URI = `mongodb://${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/${process.env.MONGODB_DB}`;
const options = {
  user: process.env.MONGODB_USERNAME,
  pass: process.env.MONGODB_PASSWORD
};

mongoose.Promise = global.Promise;
mongoose.connect(MONGODB_URI, options)
  .then(() => {
    console.log("Conexión a BBDD establecida satisfactoriamente...");

    // Iniciar el servidor
    const API_PORT = process.env.API_PORT || 3000;
    app.listen(API_PORT, () => {
      console.log(`Servidor escuchando en el puerto ${API_PORT}`);
    });
  })
  .catch(err => console.error(err));

// Definir las rutas de la API
app.get('/api/status', (req,res) => {
  res.status(200).send({
      "message": "API Online",
      "status": 200
  });
});
const productsRoutes = require('./routes/productsRoute');
app.use('/api/inventory', productsRoutes);

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