import {createPool} from '../utils/db.js';
import {Credential} from '../model/credentialModel.js';
import bcrypt from 'bcrypt';
class User {

    constructor(){
    }
    
    get name(){
        return this._name;
    }
    set name(name){
        this._name = name;
    }
    get lastname(){
        return this._lastname;
    }
    set lastname(lastname){
        this._lastname = lastname;
    }
    get email(){
        return this._email;
    }
    set email(email){
        this._email = email;
    }
    get idnumber(){
        return this._idnumber;
    }
    set idnumber(idnumber){
        this._idnumber = idnumber;
    }

    createUser = async (user) =>{ 
        let result = null;
        let id_credential = null;
        const user_splitted_idnum = user.idnumber.split('-');
        const user_pass = user_splitted_idnum[0].slice(-4);
        console.log('user_pass', user_pass);

        const hashed_password = await bcrypt.hash(user_pass, 10);
        console.log('hashed_pass', hashed_password);
        const credential = new Credential();
        credential.user = user.email;
        credential.password = hashed_password;
        
        id_credential = await credential.createCredential(credential);
        console.log('id_credential', id_credential);
        try {
            if(id_credential != null){
                const pool = await createPool();
                const connection = await pool.getConnection();
                const query = `INSERT INTO user(name,lastname,email,idnumber,id_credential) VALUES(?,?,?,?,?);`;
                const [rows] = await connection.execute(query, [user.name,user.lastname,user.email, user.idnumber, id_credential]);
                console.log('rows  insert user: ', rows);
                if(rows.insertId > 0){
                    result = true;
                }
            }
            
        } catch (error) {
            console.log('insert user error: ',error);
        }
        return new Promise((resolve, reject) =>{
            resolve(result);
        });
    }
}

export {User};