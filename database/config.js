const mongoose = require('mongoose');

mongoose.connect(process.env.DB_CNN)
    .then(() => console.log('BASE DE DATOS CONECTADA'))
    .catch((e) => console.log('Fallo de conexión'))