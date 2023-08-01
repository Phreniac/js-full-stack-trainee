import Sequelize from "sequelize";
import db from '../db.js';
import {libroModel} from '../model/libroModel.js'

class Usuario {

    constructor(nombre, apellido, rut, telefono, direccion, id_user){
        this.nombre = nombre;
        this.apellido = apellido;
        this.rut = rut;
        this.telefono = telefono;
        this.direccion = direccion;
        this.id_user = id_user;
    }

    async obtenerTodosLosUsuarios () {
        try {
            await libroModel.sync();
            return await libroModel.findAll();
        } catch (error) {
            console.log('getalluser error: ', error)
        }
    }
    async crearUsuario(){
        try {
            await usuarioModel.sync();
            console.log('usuario', this)
            const usuario_creado =  await usuarioModel.create(this);
            if(usuario_creado) return usuario_creado.dataValues;
            else return false;
        } catch (error) {
            console.log('crear usuario error: ', error);
        }
    };
}

const usuarioModel = db.define('Usuarios', {
    nombre:{
        type:Sequelize.STRING,
        allowNull: false,
    },
    apellido:{
        type:Sequelize.INTEGER,
        allowNull: false,
    },
    rut:{
        type:Sequelize.STRING,
        allowNull: false,
    },
    direccion:{
        type:Sequelize.STRING,
        allowNull: false,
    },
    telefono:{
        type:Sequelize.STRING,
        allowNull: false,
    },
    id_usuario:{
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement:true,
    }

});

usuarioModel.hasMany(libroModel, { 
    foreignKey: 'id_usuario', 
    onDelete: 'CASCADE' // Esto asegura que si se elimina un usuario, todos sus libros también serán eliminados.
  });
libroModel.belongsTo(usuarioModel, { foreignKey: 'id_usuario' });

export {Usuario, usuarioModel};