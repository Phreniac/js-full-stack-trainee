import jwt from 'jsonwebtoken';
import { responseObject } from '../utils/responseObject.js';

const secret_key = 'ABCDE12345!';

export const generateJWT= (user)=>{
    const token = jwt.sign(user, secret_key, {expiresIn:10});
    return token;
}

export const validateJWT= (token)=>{
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

export const JWTMiddelware = (req, res, next) =>{
    const token = req.header('Authorization').split(' ')[1];
    const verfied_token = validateJWT(token);
    const response = responseObject;
    response.msg = 'Validación Token de acceso';
    if(verfied_token){
        next();
    }else{
        response.err = 'El token es invalido';
        res.status(401).send(response)
    }
}