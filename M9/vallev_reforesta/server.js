import express from 'express';
import cors from 'cors';
import routes from './routes/index.js';
const app = express();
const port = 3200;

app.use(express.json());
app.use(cors());
app.use('/',routes);

app.listen(port, ()=>{
    console.log(`Servidor corriendo en el puerto ${port}`);
})