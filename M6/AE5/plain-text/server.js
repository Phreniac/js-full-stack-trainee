const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const port = 3200;
app.use(cors());
app.use(bodyParser.json());
const routes = require('./routes');

//modularización para las rutas, se obtiene el index de enrutamiento
app.use('/library', routes);

app.listen(port, ()=>{
    console.log(`Servidor corriendo en el puerto ${port}.`);
});