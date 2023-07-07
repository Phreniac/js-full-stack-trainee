//Se genera un servidor con express
const express = require('express');
const app = express();
const port = 3200;
//llamado al modulo handlebars
//const path = require('path');

app.set("view engine", "hbs");

//Ruta disponible para la renderización de los templates
app.get('/', (req, res)=>{
    res.render('main', {name:'Pedrito'});
});

app.get('/about', (req, res)=>{
    res.render('about', {name:'Pedrito'});
});

app.listen(port,()=>{
    console.log(`El Servidor esta corriendo en el puerto ${port}`);
})
