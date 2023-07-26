import Sequelize from "sequelize";
import db from '../utils/db_sequelize.js';
import {userModel} from './userModel.js';
import {movieModel} from './movieModel.js';

//se define la clase con atributos y metodos
class UsersMovies {
    
    constructor(id_user, id_movie){
        this.id_user = id_user;
        this.id_movie = id_movie;
    }
    
    async createUsersMovies(){ 
        try {
            await usersMoviesModel.sync();
            const created_usermovie = await usersMoviesModel.create(this);
            if(created_usermovie){
                console.log('user movie creada: ', created_usermovie);
                return created_usermovie.dataValues;
            }else{
                return false;
            }
        } catch (error) {
            console.log('insert user error: ',error);
        }
    }
}
//se define el modelo con los atributos (columnas de tablas)
//sequelize automaticamente designa un nombre para esto en la base de datos
const usersMoviesModel = db.define('UsersMovies', {
    id_usersmovies:{
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement:true,
    },
    id_user:{
        type:Sequelize.INTEGER,
        allowNull: false,
        references:{
            model:'users',
            key:'id'
        }
    },
    id_movie:{
        type:Sequelize.INTEGER,
        allowNull: false,
        references:{
            model:'movies',
            key:'id_movie'
        }
    }
});
// se define la relacion de ambos modelos (tablas user - movies)
userModel.belongsToMany(movieModel, {through: usersMoviesModel, foreignKey: 'id_user', otherKey: 'id_movie' });
movieModel.belongsToMany(userModel,{through: usersMoviesModel, foreignKey: 'id_movie', otherKey:'id_user' });

export {UsersMovies, usersMoviesModel};
