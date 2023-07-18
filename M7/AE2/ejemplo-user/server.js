//importación de dependencias o librerias
import express from 'express';
import routes from './routes/index.js';

const app = express();
const port = 3200;

//middleware para parsear el body
app.use(express.json());
//middleware para definir las rutas en una uri principal "/"
app.use('/', routes);

//ruta get para prueba del funcionamiento
app.get('/', (req, res)=>{
    res.send('servidor funcionando!');
});

//se levanta el servidor en el puerto definido
app.listen(port, ()=>{
    console.log(`The server is running on the port ${port}`);
});