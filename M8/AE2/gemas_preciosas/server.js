import express from 'express';
import fileUpload from 'express-fileupload';
import path from 'path';
import { fileURLToPath } from 'url';
import Jimp from 'jimp';
import {JWTMiddelware,JWTMiddelwareUser, validateJWT, generateJWT} from './middleware/jwt.js';
import {responseObject} from './utils/responseObject.js';
import cors from 'cors';

const app = express();

//crean constantes con los directorios locales
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());
app.use(fileUpload());
app.use(express.static('public'));

const _routes = {
    jewell:{
        self:'/jewell/:id_jewell',
        create:'/jewell/create',
        getall:'/jewell-getall/',
        delete:'/jewell/delete',
        update:'/jewell/update',
        upload_image:'/jewell/upload-image/:id_jewell'
    },
    user:{
        create: '/user/create',
        login: '/user/login',
        update: '/user/update',
        verify_token: '/user/verify-token'
    }
}

const jewell_list = [];
const user_list = [];

//ruta para crear
app.post(_routes.jewell.create, async (req, res, next) => {
    const _host = 'http://'+req.headers.host;
    try {
        const {name, weight, price, material} = req.body;
        if(name && weight && price && material){
            const id_jewell = jewell_list.length + 1;
            const jewell = {
                id: id_jewell,
                name: name,
                weight:weight,
                price:price,
                material:material,
                links:{
                    self: _host + _routes.self.replace(':id_jewell', id_jewell),
                    getall: _host + _routes.getall,
                    update: _host + _routes.update +'/'+ id_jewell,
                    delete: _host +_routes.delete +'/'+ id_jewell,
                }
            }
        jewell_list.push(jewell);
        res.status(200).send(jewell);
    }else{
        next(new Error('Missing required parameters.'));
    }
    } catch (error) {
        next(new Error('Internal server error.')); 
    }
    
});
// ruta para busqueda por id
app.get(_routes.jewell.self, async (req, res, next) => {
    try {
        const {id_jewell} = req.params;
        let finded_jewell = jewell_list.find(jewell => jewell.id == id_jewell);
        if(finded_jewell){
            res.status(200).send(finded_jewell);
        }else{
            res.status(404).send('La joya no se encontró.');
        }
    } catch (error) {
        next(new Error('Internal server error.')); 
    }
});

//filtros para busqueda
app.get(_routes.jewell.getall, async (req, res, next) => {
    try {
        const {name, material} = req.query;
        let filtered_jewell_list = jewell_list;
        if(name){
            filtered_jewell_list = filtered_jewell_list.filter(jewell => jewell.name.includes(name));
        }
        if(material){
            filtered_jewell_list = filtered_jewell_list.filter(jewell => jewell.material.includes(material));
        }
        res.status(200).send(filtered_jewell_list);
    } catch (error) {
        next(new Error('Internal server error.')); 
    }
});

//ruta para subida de imagen de una joya
app.put(_routes.jewell.upload_image, async (req, res, next) => {

    let jewell_exist = false;
    const max_weight = 1024 * 1024 * 5;
    console.log(req.files);
    let image_bw = null;

    try {
        const {id_jewell} = req.params;
        const uploaded_image = req.files.image;

        if(id_jewell && uploaded_image){
            if(uploaded_image.size > max_weight){
                res.status(400).send('La imagen supera el peso maximo.')
                return;
            }
            //extension del archivo para crear nombre
            const file_ext = path.extname(uploaded_image.name);
            jewell_exist = findJewellById(id_jewell);
            if(jewell_exist){

                await Jimp.read(uploaded_image.data)
                .then((img) => {
                //se obtiene la imagen con Jimp y se añaden las modificaciones
                image_bw = img
                    .resize(400, Jimp.AUTO) // resize
                    .quality(60) // set JPEG quality
                }).catch((err) => {
                    console.error(err);
                });
                const file_name_bw = path.parse(uploaded_image.name).name +'_black_white_'+ Date.now() + file_ext;
                const file_name_color = path.parse(uploaded_image.name).name +'_color_'+ Date.now() + file_ext;
                await image_bw.writeAsync(__dirname + '/public/uploads/' + file_name_color )
            
                image_bw.grayscale();
                await image_bw.writeAsync(__dirname + '/public/uploads/' + file_name_bw )

                const file_path_color = `http://${req.headers.host}/uploads/${file_name_color}`;
                const file_path_bw = `http://${req.headers.host}/uploads/${file_name_bw}`;

                jewell_exist.image = {
                    color:file_path_color,
                    blackandwhite: file_path_bw
                }
                res.status(200).send(jewell_exist);
            }else{
                res.status(400).send('La joya no existe');
            }
            
    }else{
        next(new Error('Missing required parameters.'));
    }
    } catch (error) {
        console.log(error);
        next(new Error('Internal server error.')); 
    }
    
});

app.post(_routes.user.create, (req, res) => {
    const {name, lastname, email} = req.body;
    if(name && lastname && email){
        const user = {
            id: user_list.length + 1,
            name: name,
            lastname: lastname,
            email: email,
        }
        res.send(user);
        user.password = '2023!';
        user_list.push(user);
    }
});

app.put(_routes.user.update, JWTMiddelwareUser, async (req, res) => {
    const response = responseObject();
    response.msg = 'Actualizar usuario';
    const {name, lastname, email, id_user} = req.body;
    if(name && lastname && email && id_user){
        const decoded_token = req.access_token;
        if(decoded_token.id == id_user){
            console.log('decoded_token', decoded_token);
            const user_index = await getUserIndexById(id_user);
            if(user_index > -1){
                user_list[user_index].name = name;
                user_list[user_index].lastname = lastname;
                user_list[user_index].email = email;
                response.data = user_list[user_index];
            }else{
                response.err = 'El usuario no se encontró.'; 
            }
        }else{
            response.err = 'Sin autorización para el uso del servicio.';  
        }
    }else{
        response.err = 'Faltan parametros requeridos.'; 
    }
    res.send(response);
});

app.post(_routes.user.login, (req, res) => {
    const response = responseObject();
    response.msg = 'Inicio de sesión';

    const {email, password} = req.body;
    if(email && password){
        const user_exist = getUserByEmail(email);
        console.log('user_exist', user_exist);
        if(user_exist){
            if(user_exist.password == password){
                console.log('contraseñas coinciden');
                user_exist.password = '';
                response.data = generateJWT(user_exist);
                res.send(response);
            }else{
                response.err = 'Credenciales invalidas.';
                res.status(401).send(response)    
            }
            
        }else{
            response.err = 'Credenciales invalidas.';
            res.status(401).send(response)
        }
    }else{
        response.err = 'Faltan parametros requeridos';
        res.status(400).send(response)
    }
});

app.post(_routes.user.verify_token, (req, res) => {
    const {access_token} = req.body;
    const response = responseObject();
    response.msg = 'Verificación de token de accesso';
    if(access_token){
        const token_isvalid = validateJWT(access_token);
        if(token_isvalid){
            response.data = true;
            res.status(200).send(response)    
        }else{
            response.data = false;
            response.err = 'Token invalido';
            res.status(200).send(response)
        }
    }else{
        res.status(400).send('Faltan parametros requeridos')
    }
});

const getUserByEmail= (email_user)=>{
    let user = user_list.find(user => user.email == email_user);
    return user;
}
const getUserIndexById= async (id_user)=>{
    let user = user_list.findIndex(user => user.id == id_user);
    return user;
}

function findJewellById(id_jewell){
    let finded_jewell = jewell_list.find( jewell => jewell.id == id_jewell);
    console.log('finded',finded_jewell)
    return finded_jewell;
}

//rutas por hacer

app.put(_routes.update + '/:id_jewell', async (req, res, next) => {
    
});

app.delete(_routes.delete + '/:id_jewell', async (req, res, next) => {
    
});

//middleware control de error generico
app.use((err, req, res, next) => {
    console.log(err);
    if(err){
        res.status(500).send('Ocurrio un error!');
    } 
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});