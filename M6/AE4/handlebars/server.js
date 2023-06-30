//Se genera un servidor con express
const express = require('express');
const app = express();
const port = 3200;
//llamado al modulo handlebars
const exphbs = require('express-handlebars');
//const path = require('path');

//Se crea el objeto hbs a partir de la funcion create de handlebars
const hbs = exphbs.create({layoutsDir: __dirname + "/views"});

//Se configura el servidor para que utilice handlebars
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

//Ruta disponible para la renderización de los templates
app.get('/', (req, res)=>{
    res.render('main', {name:'Pedrito'});
});

app.listen(port,()=>{
    console.log(`El Servidor esta corriendo en el puerto ${port}`);
})
