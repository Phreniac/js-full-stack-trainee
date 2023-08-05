import express from 'express';
import fileUpload from 'express-fileupload';

import path from 'path';
import { fileURLToPath } from 'url';
//crean constantes con los directorios locales
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;
//middlewares
app.use(express.json());
app.use(fileUpload());
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send('server ok');
});
//ruta para subir un archivo
app.post('/upload', (req, res) => {
  //se obtiene el archivo desde el request
  const uploaded_file = req.files.text;
  console.log(uploaded_file);
  //directorio de subida de archivos
  const upload_dir = '/public/uploads/';
  //extension del archivo para crear nombre
  const file_ext = path.extname(uploaded_file.name);
  //se crea un nombre a partir del nombre original y una fecha de modo que sea unico
  const file_name = path.parse(uploaded_file.name).name +'_'+ Date.now() + file_ext;
  //se mueve el archivo obtenido con el directorio, nombre del archivo y extension
  uploaded_file.mv(__dirname + upload_dir + file_name, (err)=>{
    if(err){
      console.log('error al subir: ',err);
      res.send('La imagen no se subio correctamente');
    }
    //se genera una ruta que haria referencia al archivo en el repositorio
    const file_path = `http://${req.headers.host}/uploads/${file_name}`;
    //objeto devuelto al momento de mover el archivo correctamente
    res.send({
      msg:'Upload file',
      data: file_path,
      err:null
    });
  });
});

app.listen(port, () => {
  console.log(`Servidor ejecutándose en http://localhost:${port}`);
});
