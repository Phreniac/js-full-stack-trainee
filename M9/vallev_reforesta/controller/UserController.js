import {Usuario} from '../model/UserModel.js';
export const crearUsuario = async (req, res) =>{
    let response = {
        msg:'Creación de usuario',
        error: null,
        data: null
    };
    try {
        const {nombre, apellido, rut, correo, id_rol, contrasena} = req.body;
        if(nombre && apellido && rut && correo && id_rol && contrasena){
            const usuario = new Usuario(nombre, apellido, rut, correo, id_rol);
            usuario.contrasena = contrasena;
            const resultado_modelo = await usuario.crear();
            console.log('resultado modelo usuario', resultado_modelo);
            if(resultado_modelo != null) response.data = resultado_modelo;
            else response.error = 'Error al crear el usuario'
        }else{
            response.error = "Faltan parametros requeridos";
        }
        res.send(response);
    } catch (error) {
        response.error = 'Error interno del servidor';
        console.log(error);
        res.status(500).send(response);
    }
};

export const actualizarUsuario = async (req, res) =>{
    let response = {
        msg:'Actualización de usuario',
        error: null,
        data: null
    };
    try {
        const {nombre, apellido, rut, correo} = req.body;
        const {id_usuario} = req.params;
        if(nombre && apellido && rut && correo && id_usuario){
            const usuario = new Usuario(nombre, apellido, rut, correo);
            usuario.id = id_usuario;
            const resultado_modelo = await usuario.actualizar();
            console.log('resultado modelo usuario', resultado_modelo);
            if(resultado_modelo != null) response.data = resultado_modelo;
            else response.error = 'Error al crear el usuario'
        }else{
            response.error = "Faltan parametros requeridos";
        }
        res.send(response);
    } catch (error) {
        response.error = 'Error interno del servidor';
        console.log(error);
        res.status(500).send(response);
    }
};

export const loginUsuario = async (req, res) =>{
    let response = {
        msg:'Login de usuario',
        error: null,
        data: null
    };
    try {
        const {correo, contrasena} = req.body;
        if(correo && contrasena){
            const usuario = new Usuario();
            usuario.contrasena = contrasena;
            usuario.correo = correo;
            const resultado_modelo = await usuario.login();
            console.log('resultado modelo usuario', resultado_modelo);
            if(resultado_modelo != null) response.data = resultado_modelo;
            else response.error = 'Error al crear el usuario'
        }else{
            response.error = "Faltan parametros requeridos";
        }
        res.send(response);
    } catch (error) {
        response.error = 'Error interno del servidor';
        console.log(error);
        res.status(500).send(response);
    }
};

export const getAllUsers = async (req, res) =>{
    
};