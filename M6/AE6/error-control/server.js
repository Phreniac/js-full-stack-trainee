const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const port = 3200;
app.use(cors());
app.use(bodyParser.json());

app.get('/suma/:num1/:num2', (req, res)=>{
    let response = {
        msg:'Suma',
        err:null,
        data: null
    }
    const num1 = req.params.num1;
    const num2 = undefined;
    if(num1 && num2){
        console.log('num1:', num1);
        console.log('num2:', num2);
        response.data = parseInt(num1) + parseInt(num2);
    }else{
        response.err = 'Faltan parametros para sumar';
    }
    res.status(200).send(response);
});

app.post('/suma/', (req, res)=>{
    const num1 = req.body.num1;
    const num2 = req.body.num2;

    if(num1 && num2){
        console.log('num1:', num1);
        console.log('num2:', num2);
        res.send('suma');
    }else{
        res.send('faltan parametros para sumar');
    }
});

app.get('/resta', (req, res)=>{
    res.send('ruta test de platform');
});

app.get('/division', (req, res)=>{
    res.send('ruta test de platform');
});

app.get('/multiplicacion', (req, res)=>{
    res.send('ruta test de platform');
});


app.listen(port, ()=>{
    console.log(`Servidor corriendo en el puerto ${port}.`);
});