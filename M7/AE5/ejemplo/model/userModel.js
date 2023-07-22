import Sequelize from "sequelize";
import db from '../utils/db_sequelize.js'
import bcrypt from 'bcrypt';
class User {

    constructor(name, lastname, idnumber, email){
        this.name = name;
        this.lastname = lastname;
        this.idnumber = idnumber;
        this.email = email
    }

    getAllUsers = async () =>{
        try {
            await userModel.sync();
            return await userModel.findAll();
        } catch (error) {
            console.log('getalluser error: ', error)
        }
    }

    createUser = async () =>{
        try {
            await userModel.sync();
           const user_created =  await userModel.create(this);
           if(user_created) return user_created.dataValues
           else return false
        } catch (error) {
            console.log('create user error: ', error);
        }
    };
}

const userModel = db.define('User', {
    id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement:true,
    },
    name:{
        type:Sequelize.STRING,
        allowNull: false,
    },
    lastname:{
        type:Sequelize.STRING,
        allowNull: false,
    },
    email:{
        type:Sequelize.STRING,
        allowNull: false,
    },
    idnumber: {
        type:Sequelize.STRING,
        allowNull: false,
    },
    id_credential: {
        type:Sequelize.INTEGER,
        allowNull: true,
    },
    id_state:{
        type:Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1
    }
});

export {User};