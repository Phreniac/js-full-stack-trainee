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
    get id(){
        return this._id;
    }
    set id(id){
        this._id = id;
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
                connection.release();
            }
            
        } catch (error) {
            console.log('insert user error: ',error);
        }
        return new Promise((resolve, reject) =>{
            resolve(result);
        });
    }
    getAllUsers = async () =>{
        let result = null;
        try {
            const pool = await createPool();
            const connection = await pool.getConnection();
            const query = `SELECT * FROM user WHERE id_state = 1;`;
            const [rows] = await connection.execute(query);
            console.log('rows  select user: ', rows);
            if(rows) result = rows;
            connection.release();
        } catch (error) {
            console.log('select user error: ',error);
        }
        return new Promise((resolve, reject) =>{
            resolve(result);
        });
    }
    updateUser = async (user) =>{ 
        let result = null;
        try {
            const pool = await createPool();
            const connection = await pool.getConnection();
            const query = `UPDATE user SET name = ?, lastname = ?, email = ?, idnumber = ? WHERE id_user = ? AND id_state = 1;`;
            const [rows] = await connection.execute(query, [user.name,user.lastname,user.email, user.idnumber, user.id]);
            console.log('rows  update user: ', rows);
            if(rows.changedRows > 0){
                result = true;
            }
            connection.release();
        } catch (error) {
            console.log('update user error: ',error);
        }
        return new Promise((resolve, reject) =>{
            resolve(result);
        });
    }
    deleteUser = async (user) =>{ 
        let result = null;
        try {
            const pool = await createPool();
            const connection = await pool.getConnection();
            const query = `UPDATE user SET id_state = 3 WHERE id_user = ? AND id_state = 1;`;
            const [rows] = await connection.execute(query, [user.id]);
            console.log('rows  delete user: ', rows);
            if(rows.changedRows > 0){
                result = true;
            }
            connection.release();
        } catch (error) {
            console.log('update user error: ',error);
        }
        return new Promise((resolve, reject) =>{
            resolve(result);
        });
    }
    loginUser = async (user, password) =>{ 
        let result = null;
        try {
            const pool = await createPool();
            const connection = await pool.getConnection();
            const query = `SELECT * FROM user
            JOIN credential on credential.id_credential = user.id_credential
            WHERE user.email = ?`;
            const [rows] = await connection.execute(query, [user]);
            if(rows.length > 0){
                const saved_password = rows[0].password;
                const bcrypt_result = await bcrypt.compare(password, saved_password);
                if(bcrypt_result) result = true;
                else result = false;

            }
            connection.release();
        } catch (error) {
            console.log('login user error: ',error);
        }
        return new Promise((resolve, reject) =>{
            resolve(result);
        });
    }

}

export {User};