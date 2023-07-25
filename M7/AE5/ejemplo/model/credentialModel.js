import Sequelize from "sequelize";
import db from '../utils/db_sequelize.js'
class Credential {

    constructor(user, password){
        this.user = user;
        this.password = password
    }
    
    async createCredential(){ 
        try {
            await credentialModel.sync();
            const created_credential = await credentialModel.create(this);
            if(created_credential){
                console.log('credencial creada: ', created_credential);
                return created_credential.dataValues.id;
            }else{
                return false;
            }
        } catch (error) {
            console.log('insert user error: ',error);
        }
    }
}

const credentialModel = db.define('Credential', {
    id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement:true,
    },
    password:{
        type:Sequelize.STRING,
        allowNull: false,
    },
    user:{
        type:Sequelize.STRING,
        allowNull: false,
    }
});

export {Credential, credentialModel};