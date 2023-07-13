import express from 'express';
import routes from './routes/index.js';

const app = express();
const port = 3200;

app.use(express.json());
app.use('/', routes)

app.get('/', (req, res)=>{
    res.send('servidor funcionando!');
});

app.listen(port, ()=>{
    console.log(`The server is running on the port ${port}`);
});