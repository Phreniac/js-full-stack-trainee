import express from 'express';
import {Libro} from '../model/libroModel.js';
const router = express.Router();

router.post('/crear', async (req, res)=>{
    const obj_response = {
        msg: 'Crear libro',
        error: null,
        data: null
    }
    const titulo = req.body.titulo;
    const numero_paginas = req.body.numero_paginas;
    const isbn = req.body.isbn;

    if(titulo && numero_paginas && isbn){
        const libro = new Libro(titulo, numero_paginas, isbn, null);
        const resultado_modelo = await libro.crearLibro(libro);
        console.log('result modelo', resultado_modelo);
        if(resultado_modelo){
            obj_response.data = resultado_modelo;
        }else{
            obj_response.error = 'Ocurrio un error al intentar crear el libro';
        }
    }else{
        obj_response.error = 'Faltan parametros requeridos'
    }
    res.send(obj_response);
});

router.get('/todos', async (req, res)=>{
    const obj_response = {
        msg: 'Crear libro',
        error: null,
        data: null
    }
    const libro = new Libro();
    const resultado_modelo = await libro.obtenerTodosLibros();
    console.log('resultado modelo', resultado_modelo);
    if(resultado_modelo){
        obj_response.data = resultado_modelo;
    }else{
        obj_response.error = 'Ocurrio un error al intentar obtener los libros';
    }
    res.send(obj_response);
});


export default router;