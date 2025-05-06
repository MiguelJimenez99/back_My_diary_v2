const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const authRoutes = require('./routes/auth.routes.js');
app.use('/api/auth', authRoutes);

mongoose.connect(process.env.URL_DATABASE)
  .then(() => console.log('MongoDb conectado correctamente'))
  .catch((err) => console.log('Error al establecer la coneccion', err))

const PUERTO = process.env.PUERTO;

app.listen(PUERTO, () => {
  console.log(`Servidor corriendo en el puerto ${PUERTO}`);
});