//importación de dependencias
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const port = 3200;
const path = require('path');
const Jimp = require("jimp");

//middlewares para controlar los parametros de entrada
app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
//middleware para declarar el contenido estatico en la carpeta 'public'
app.use(express.static('public'));

//se configura el hbs para utilizar un layout
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, 'views'));
app.set("view options", {layout: 'layout'});

//ruta que acepta la url de la imagen para tratarla con JIMP
app.post('/upload-img', async(req, res)=>{
    const url_img = req.body.url_img;
    let image = null;
    let image_name = null;
    if(url_img) {
       await Jimp.read(url_img)
        .then((img) => {
            //se obtiene la imagen con Jimp y se añaden las modificaciones
          image = img
            .resize(350, Jimp.AUTO) // resize
            .quality(60) // set JPEG quality
            .greyscale() // set greyscale
        })
        .catch((err) => {
            console.error(err);
        });
        //si la imagen no es null al momento de tratarla se guardara en la carpeta assets/img
        //el nombre se genera con un numero de fecha unix
        if(image != null){
            image_name = `newImage_${Date.now()}.jpg`;
            console.log('nombre imagen: ', image_name);
            const processedImgPath = path.join(__dirname, 'public/assets/img/', image_name);
            await image.writeAsync(processedImgPath);
            console.log('se guarda la imagen');
            res.render('upload-image',{title:'Imagen Modificada', image:`../assets/img/${image_name}`});
        }else{
            //si la imagen al momento de procesarla con Jimp es null se devuelve un mensaje de error
            res.send('Hubo un problema con la imagen')
        }
    }
});

app.listen(port, ()=>{
    console.log(`El Servidor esta funcionando en el puerto ${port}`);
});