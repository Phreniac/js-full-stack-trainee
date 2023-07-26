import Sequelize from "sequelize";
import db from '../utils/db_sequelize.js'
import {credentialModel} from './credentialModel.js';

class User {

    constructor(name, lastname, idnumber, email, id, id_credential){
        this.id = id;
        this.name = name;
        this.lastname = lastname;
        this.idnumber = idnumber;
        this.email = email;
        this.id_credential = id_credential
    }

    async getAllUsers () {
        try {
            await userModel.sync();
            return await userModel.findAll({where:{id_state: 1}});
        } catch (error) {
            console.log('getalluser error: ', error)
        }
    }
    async createUser(){
        try {
            await userModel.sync();
            const user_created =  await userModel.create(this);
            if(user_created) return user_created.dataValues;
            else return false;
        } catch (error) {
            console.log('create user error: ', error);
        }
    };
    async updateUser(){
        try {
            await userModel.sync();
            
           const user_updated =  await userModel.update(this,{where:{id:this.id}});
           if(user_updated.length > 0) return true;
           else return false;

        } catch (error) {
            console.log('updateuser error: ', error);
        }
    };
    //se borra el registro de la base de datos
    // deleteUser = async () =>{
    //     try {
    //         await userModel.sync();
    //         console.log('id',this);
    //         const user_deleted = await userModel.destroy({where:{id:this.id}});
    //         if(user_deleted > 0) return true;
    //         else return false;
            
    //     } catch (error) {
    //         console.log('deleteuser error: ', error);
    //     }
    // };
    async deleteUser(){
        try {
            await userModel.sync();
            console.log('id',this);
            const user_deleted = await userModel.update({
                id_state: 2
            },{where:{id:this.id}});
            if(user_deleted > 0) return true;
            else return false;
            
        } catch (error) {
            console.log('deleteuser error: ', error);
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
        references:{
            model:'credentials',
            key:'id'
        }
    },
    id_state:{
        type:Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1
    }
});

credentialModel.hasOne(userModel,{
    foreignKey: 'id'
});

userModel.belongsTo(credentialModel,{
    foreignKey: 'idCredential'
});

export {User, userModel};