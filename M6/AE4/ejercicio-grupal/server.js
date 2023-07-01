const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const port = 3200;
const path = require('path');
const Jimp = require("jimp");

app.use(cors());

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(express.static('public'));

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, 'views'));
app.set("view options", {layout: 'layout'});

app.post('/upload-img', async(req, res)=>{
    const url_img = req.body.url_img;
    console.log('body', req.body)
    let image = null;
    let image_name = null;
    if(url_img) {
       await Jimp.read(url_img)
        .then((img) => {
          image = img
            .resize(350, Jimp.AUTO) // resize
            .quality(60) // set JPEG quality
            .greyscale() // set greyscale
        })
        .catch((err) => {
            console.error(err);
        });
        image_name = `newImage_${Date.now()}.jpg`;
        console.log('nombre imagen: ', image_name);
        const processedImgPath = path.join(__dirname, 'public/img/', image_name);
        await image.writeAsync(processedImgPath);
        console.log('se guarda la imagen');
    }

    res.render('upload-image',{title:'Imagen Modificada', image:`../public/assets/img/${image_name}.jpg`});
});

app.listen(port, ()=>{
    console.log(`El Servidor esta funcionando en el puerto ${port}`);
});