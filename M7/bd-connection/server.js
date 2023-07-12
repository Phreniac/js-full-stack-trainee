const express = require('express');
const app = express();
const port = 3200;
const db = require('./db'); 

app.get('/', (req, res)=>{
    console.log('hola mundo!');
    res.send('Hola Mundo!');
});

app.post('/crear-usuario', (req, res)=>{
    //console.log('db', db);
    db.query('SELECT * FROM usuario', (err, result)=>{
        if(err){
            console.log('error query: ', err);
        }else{
            console.log('resultado query: ', result);
        }
    });
});

app.listen(port, ()=>{
    console.log(`Servidor corriendo en el puerto ${port}`);
});