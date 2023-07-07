const express = require('express');
const app = express();
const cors = require('cors');
const port = 3200;
//modulo envio de email nodemailer
const nodemailer = require('nodemailer');
//dotenv utilización de los variables de entorno
require('dotenv').config();

//middleware
app.use(cors());
app.use(express.json());

app.get('/', (req, res)=>{
    res.send('hola');
});
//creación de ruta para el envio, acepta un array con emails y un asunto
app.post('/enviar-correo', async (req, res)=>{
   const lista_email = req.body.lista_email;
   const asunto = req.body.asunto;
    try {
        if(lista_email && asunto){
            const res_envio = await enviarEmail(lista_email, asunto);
            if(res_envio){
                res.send('Email enviado exitosamente')
            }else{
                res.send('Hubo un problema al enviar el email')
            }
        }
    } catch (error) {
        console.log('error al enviar:', error);
    }
});

const obtenerContenido = ()=>{
    //llamar a la api mindicador y obtener la información requerida para realizar el html
    return '<h1>Has ganado un ipad 20 pro!! Haz click aqui y deja tus datos para el envio. 100% real no fake</h1>';
}
const enviarEmail = (lista_email, asunto)=>{
    let result = false;
    const to_ = lista_email.join(',');
    // se crea el objeto transportador para el envio del email
    let transportador = nodemailer.createTransport({
        service: process.env.SMTP_SERVICE,
        auth:{
            user:process.env.SMTP_USER,
            pass:process.env.SMTP_PASS
        }
    });
    //objeto con las opciones de envio
    let opcionesEmail = {
        from: process.env.SMTP_USER,
        to: to_,
        subject: asunto,
        html: obtenerContenido()
    };
    //se ejecuta la funcion sendEmail la cual envia el correo
    transportador.sendMail(opcionesEmail, (err, data) =>{
        if(err) console.log('error al enviar: ', err);
        if(data){
            console.log('data envio', data);
            result = true;
            const file_content = JSON.stringify(opcionesEmail);
            writeEmail(file_content);
        } 
    });
    return new Promise((resolve, reject)=>{
        resolve(result);
    });
}

//se crea el archivo json a partir de las opciones del email convertidas a string
const writeEmail = ()=>{

}
app.listen(port, ()=>{
    console.log(`Servidor corriendo en el puerto ${port}.`);
});