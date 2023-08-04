import express from 'express';
const app = express();
import { stringValidation, hello } from './validator.js';

app.use(express.json());


// Middleware
app.use((req, res, next) => {
    console.log('req.body: ', req.body);
    console.log(`Ruta accedida: ${req.path} - Fecha: ${new Date().toISOString()}`);
    next();
});

app.get('/user/getall', (req, res) => {
    console.log('ruta / req.body: ', req.body);
    res.send('¡Hola mundo!');
});

app.post('/user/create', async (req, res, next) => {
    const nombre = req.body.nombre;
    const apellido = req.body.nombre;
    if(nombre && apellido){
        console.log('ruta / req.body: ', nombre);
    }else{
        next(new Error('No se ingresaron los valores requeridos.'));
    }
});

app.put('/user/update', stringValidation, () => hello('Pablito'), async (req, res, next) => {
    try {
        const nombre = req.body.nombre;
        const apellido = req.body.apellido;
        console.log('nombre completo', req.body.nombrecompleto);

        if(nombre && apellido){
            console.log('ruta / req.body: ', nombre);
            res.send('parametros ok');
        }else{
            next(new Error('No se ingresaron los valores requeridos.'));
        } 
    } catch (err) {
        console.log('error: ', err);
        next(new Error('No se ingresaron los valores requeridos.'));
    }
    
});

//middleware control de error
app.use((err, req, res, next) => {
    console.error('ERROR: ',err);
    res.status(500).send('Error interno del servidor.');
});


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});