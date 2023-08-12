import express from 'express';
import jwt from 'jsonwebtoken';

import path from 'path';
import { fileURLToPath } from 'url';
//crean constantes con los directorios locales
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const JWTMiddelware = (req, res, next)=>{
    console.log('middleware jwt');
    const token = req.header('Authorization').split(' ')[1];
    const verfied_token = validateJWT(token);
    if(verfied_token){
        next();
    }else{
        res.status(401).send('Error de autorización, el token es invalido')
    }
};

const app = express();
const port = 3000;

const user_list = [];

//middlewares
app.use(express.json());

app.get('/', (req, res) => {
  res.send('server ok');
});


app.post('/user/create', JWTMiddelware, (req, res) => {
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

app.post('/user/login', (req, res) => {
    const {email, password} = req.body;
    if(email && password){
        const user_exist = getUserByEmail(email)
        if(user_exist){
            if(user_exist.password == password){
                user_exist.password = '';
                const access_token = generateJWT(user_exist)
                res.send({access_token:access_token});
            }else{
                res.status(401).send('Credenciales invalidas.')    
            }
        }else{
            res.status(404).send('Usuario no encontrado')
        }
    }else{
        res.status(400).send('Faltan parametros requeridos')
    }
});

const secret_key = 'ABCDE12345!';

const generateJWT= (user)=>{
    const token = jwt.sign(user, secret_key, {expiresIn:'1h'});
    return token;
}
const validateJWT= (token)=>{
    let result = false;
    jwt.verify(token, secret_key, (err, decoded) => {
        if(err){
            console.log(err)
        }else{
            result = true;
            console.log('decoded: ', decoded);
        }
    })
    return result;
}
const getUserByEmail= (email_user)=>{
    let user = user_list.find(user => user.email == email_user);
    return user;
}


app.listen(port, () => {
  console.log(`Servidor ejecutándose en http://localhost:${port}`);
});
