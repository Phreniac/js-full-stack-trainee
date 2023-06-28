//se genera el servidor con express
const express = require('express');
const app = express();
const port = 3200;
const routes = require('./routes');
const bodyParser = require('body-parser');
const cors = require('cors');

//middle para control error cors
app.use(cors());

//middleware para el parseo del body
app.use(bodyParser.json());

//modularización para las rutas, se obtiene el index de enrutamiento
app.use('/', routes);

//se levanta el servidor en el puerto especificado
app.listen(port, ()=>{
    console.log(`Servidor corriendo en el puerto ${port}.`);
});