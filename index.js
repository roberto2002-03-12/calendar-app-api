const express = require('express');
require('dotenv').config();
require('./database/config');
const cors = require('cors');

//inicializar express
const app = express();

//cors
app.use(cors());

//lectura y parseo del body
app.use(express.json());

//ruta del auth
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));

app.listen(process.env.PORT, () => {
    //la función se ejecuta luego de andar corriendo el servidor
    console.log('Servidor corriendo');
});