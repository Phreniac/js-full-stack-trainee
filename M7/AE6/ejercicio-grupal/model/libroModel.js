import Sequelize from "sequelize";
import db from '../db.js'

class Libro {

    constructor(titulo, numero_paginas, isbn, id_libro){
        this.titulo = titulo;
        this.numero_paginas = numero_paginas;
        this.isbn = isbn;
        this.id_libro = id_libro;
    }

    async obtenerTodosLibros () {
        try {
            await libroModel.sync();
            return await libroModel.findAll();
        } catch (error) {
            console.log('getalluser error: ', error)
        }
    }
    async crearLibro(){
        try {
            await libroModel.sync();
            console.log('libro', this)
            const libro_creado =  await libroModel.create({titulo:this.titulo, numero_paginas:this.numero_paginas, isbn:this.isbn});
            if(libro_creado) return libro_creado.dataValues;
            else return false;
        } catch (error) {
            console.log('crear libro error: ', error);
        }
    };
    // async updateUser(){
    //     try {
    //         await userModel.sync();
            
    //        const user_updated =  await userModel.update(this,{where:{id:this.id}});
    //        if(user_updated.length > 0) return true;
    //        else return false;

    //     } catch (error) {
    //         console.log('updateuser error: ', error);
    //     }
    // };
    // async deleteUser(){
    //     try {
    //         await userModel.sync();
    //         console.log('id',this);
    //         const user_deleted = await userModel.update({
    //             id_state: 2
    //         },{where:{id:this.id}});
    //         if(user_deleted > 0) return true;
    //         else return false;
            
    //     } catch (error) {
    //         console.log('deleteuser error: ', error);
    //     }
    // };
}

const libroModel = db.define('Libros', {
    titulo:{
        type:Sequelize.STRING,
        allowNull: false,
    },
    numero_paginas:{
        type:Sequelize.INTEGER,
        allowNull: false,
    },
    isbn:{
        type:Sequelize.STRING,
        allowNull: false,
    },
    id_libro:{
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement:true,
    }

});

export {Libro, libroModel};