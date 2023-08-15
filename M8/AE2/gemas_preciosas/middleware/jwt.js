import jwt from 'jsonwebtoken';
import { responseObject } from '../utils/responseObject.js';

const secret_key = 'ABCDE12345!';

export const generateJWT= (user)=>{
    const token = jwt.sign(user, secret_key, {expiresIn:120});
    return token;
}

export const validateJWT= (token)=>{
    let result = false;
    jwt.verify(token, secret_key, (err, decoded) => {
        if(err){
            console.log(err)
        }else{
            result = decoded;
            console.log('decoded: ', decoded);
        }
    })
    return result;
}

export const JWTMiddelware = (req, res, next) =>{
    const token = req.header('Authorization').split(' ')[1];
    const verfied_token = validateJWT(token);
    const response = responseObject();
    response.msg = 'Validación Token de acceso';
    if(verfied_token){
        next();
    }else{
        response.err = 'El token es invalido';
        res.status(401).send(response)
    }
}

export const JWTMiddelwareUser = (req, res, next) =>{
    let token = req.header('Authorization');
    const response = responseObject();
    response.msg = 'Validación Token de acceso';
    if(token){
        token = token.split(' ')[1];
        const verified_token = validateJWT(token);
        if(verified_token){
            req.access_token = verified_token;
            next();
        }else{
            response.err = 'El token es invalido';
            res.status(401).send(response)
        }
    }else{
        response.err = 'Token invalido.';
        res.status(401).send(response);
    }
}