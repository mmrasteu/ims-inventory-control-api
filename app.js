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
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI)
        .then(() => {
            console.log("Conexion a BBDD establecida satisfactoriamente...")

            // Creacion del servidor
            app.listen(port, () => {
                console.log("Servidor corriendo correctamente en la url: localhost:3700");
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
const inventoryRoutes = require('./routes/inventoryRoutes');
app.use('/api/inventory', inventoryRoutes);

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
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
