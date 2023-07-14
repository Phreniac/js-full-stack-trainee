import {createPool} from '../utils/db.js';

class Credential {

    constructor(){
    }
    
    get user(){
        return this._user;
    }
    set user(user){
        this._user = user;
    }
    get password(){
        return this._password;
    }
    set password(password){
        this._password = password;
    }

    createCredential = async (credential) =>{ 
        let result = null;
        console.log('credential', credential);
        try {
            const pool = await createPool();
            const connection = await pool.getConnection();
            const query = `INSERT INTO credential(user, password) VALUES(?,?);`;
            const [rows] = await connection.execute(query, [credential.user,credential.password]);
            console.log('rows  insert user: ', rows);
            if(rows.insertId > 0){
                result = rows.insertId;
            }
        } catch (error) {
            console.log('insert user error: ',error);
        }
        return new Promise((resolve, reject) =>{
            resolve(result);
        });
    }
}

export {Credential};