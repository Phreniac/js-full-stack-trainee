const express = require('express');
const app = express();
const port = 3200;
const bodyParser = require('body-parser');
const cors = require('cors');
const lista_usuario = [];
let server_response = {};

app.use(cors());
app.use(bodyParser.json());

app.get('/get-all-user/',(req, res) =>{
    server_response = {
        mensaje: 'Obtener todos los usuarios',
        error: null,
        datos: lista_usuario
    }
    res.send(server_response);
});

app.get('/get-user/:id_user',(req, res) =>{
    const id_user = req.params.id_user;
    server_response = {
        mensaje: 'Obtener un usuario con id',
        error: null,
        datos: null
    }
    const finded_user = lista_usuario.find(user => id_user == user.id);
    if(finded_user != undefined){
        server_response.datos = finded_user;
    }else{
        server_response.error = 'No se encontró el usuario'
    }
    res.send(server_response);
});

app.post('/create-user/',(req, res) =>{
    server_response = {
        mensaje: 'Crear un usuario',
        error: null,
        datos: null
    }
    try {
        const user = {
            id: (lista_usuario.length + 1),
            nombre : req.body.nombre,
            apellido : req.body.apellido
        }
        lista_usuario.push(user);
        server_response.datos = true;
    } catch (error) {
        console.log('error create user:', error);
        server_response.error = 'Ocurrio un error al crear el usuario'
    }
    res.send(server_response);
});

app.delete('/delete-user/:id_usuario',(req, res) =>{
    const id_usuario = req.params.id_usuario;
    server_response = {
        mensaje: 'Borrar un usuario',
        error: null,
        datos: null
    }
    try {
        const usuario_encontrado = lista_usuario.findIndex(user => user.id == id_usuario);
        console.log('usuario encontrado', usuario_encontrado);
        if(usuario_encontrado != -1){
            lista_usuario.splice(usuario_encontrado, 1);
            server_response.datos = true;
        }else{
            server_response.error = 'El usuario no existe'
        }
    } catch (error) {
        console.log('error liminar usuario:', error);
        server_response.error = 'Ocurrio un error al crear el usuario'
    }
    res.send(server_response);
});

app.listen(port, ()=>{
    console.log(`Servidor corriendo en el puerto ${port}.`);
});