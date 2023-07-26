import Sequelize from "sequelize";
import db from '../utils/db_sequelize.js';

class Movie {

    constructor(title, duration, year, id_movie){
        this.title = title;
        this.duration = duration;
        this.year = year;
        this.id_movie = id_movie;
    }
    
    async createMovie(){ 
        try {
            await movieModel.sync();
            const created_movie = await movieModel.create(this);
            if(created_movie){
                console.log('movie creada: ', created_movie);
                return created_movie.dataValues;
            }else{
                return false;
            }
        } catch (error) {
            console.log('insert user error: ',error);
        }
    }
}

const movieModel = db.define('Movie', {
    title:{
        type:Sequelize.STRING,
        allowNull: false,
    },
    duration:{
        type:Sequelize.STRING,
        allowNull: true,
    },
    year:{
        type:Sequelize.INTEGER,
        allowNull: false,
    },
    id_movie:{
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement:true,
    }

});

export {Movie, movieModel};