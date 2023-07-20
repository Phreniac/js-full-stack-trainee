import {createPool} from '../utils/db.js';
class Card {

    constructor(){
    }
    
    get name(){
        return this._name;
    }
    set name(name){
        this._name = name;
    }

    createCard = async (card) =>{ 
        let result = null;
        try {
            const pool = await createPool();
            const connection = await pool.getConnection();
            const query = `INSERT INTO card(name,power,cost,ability,description, origin, img_url, race) VALUES(?,?,?,?,?,?,?,?);`;
            const [rows] = await connection.execute(query, []);
            console.log('rows  insert card: ', rows);
            if(rows.insertId > 0){
                result = true;
            }
            connection.release();
            
        } catch (error) {
            console.log('insert card error: ',error);
        }
        return new Promise((resolve, reject) =>{
            resolve(result);
        });
    }
    // getAllCards = async () =>{
    //     let result = null;
    //     try {
    //         const pool = await createPool();
    //         const connection = await pool.getConnection();
    //         const query = `SELECT * FROM card WHERE id_state = 1;`;
    //         const [rows] = await connection.execute(query);
    //         console.log('rows  select card: ', rows);
    //         if(rows) result = rows;
    //         connection.release();
    //     } catch (error) {
    //         console.log('select card error: ',error);
    //     }
    //     return new Promise((resolve, reject) =>{
    //         resolve(result);
    //     });
    // }
    // updateCard = async (card) =>{ 
    //     let result = null;
    //     try {
    //         const pool = await createPool();
    //         const connection = await pool.getConnection();
    //         const query = `UPDATE card SET name = ?, lastname = ?, email = ?, idnumber = ? WHERE id_card = ? AND id_state = 1;`;
    //         const [rows] = await connection.execute(query, [card.name,card.lastname,card.email, card.idnumber, card.id]);
    //         console.log('rows  update card: ', rows);
    //         if(rows.changedRows > 0){
    //             result = true;
    //         }
    //         connection.release();
    //     } catch (error) {
    //         console.log('update card error: ',error);
    //     }
    //     return new Promise((resolve, reject) =>{
    //         resolve(result);
    //     });
    // }
    // deleteCard = async (card) =>{ 
    //     let result = null;
    //     try {
    //         const pool = await createPool();
    //         const connection = await pool.getConnection();
    //         const query = `UPDATE card SET id_state = 3 WHERE id_card = ? AND id_state = 1;`;
    //         const [rows] = await connection.execute(query, [card.id]);
    //         console.log('rows  delete card: ', rows);
    //         if(rows.changedRows > 0){
    //             result = true;
    //         }
    //         connection.release();
    //     } catch (error) {
    //         console.log('update card error: ',error);
    //     }
    //     return new Promise((resolve, reject) =>{
    //         resolve(result);
    //     });
    // }
    // loginCard = async (card, password) =>{ 
    //     let result = null;
    //     try {
    //         const pool = await createPool();
    //         const connection = await pool.getConnection();
    //         const query = `SELECT * FROM card
    //         JOIN credential on credential.id_credential = card.id_credential
    //         WHERE card.email = ? AND card.id_state = 1;`;
    //         const [rows] = await connection.execute(query, [card]);
    //         if(rows.length > 0){
    //             const id_card = rows[0].id_card;
    //             const saved_password = rows[0].password;
    //             const bcrypt_result = await bcrypt.compare(password, saved_password);
    //             if(bcrypt_result){
    //                result = await this.getCardById(id_card);
    //             }else{
    //                 result = false;
    //             }
    //         }
    //         connection.release();
    //     } catch (error) {
    //         console.log('login card error: ',error);
    //     }
    //     return new Promise((resolve, reject) =>{
    //         resolve(result);
    //     });
    // }
    // getCardById = async(id_card)=>{
    //     let result = null;
    //     try {
    //         const pool = await createPool();
    //         const connection = await pool.getConnection();
    //         const query = `SELECT * FROM card WHERE id_card = ? AND id_state = 1;`;
    //         const [rows] = await connection.execute(query, [id_card]);
    //         console.log('rows  select card: ', rows);
    //         if(rows.length > 0) result = rows[0];
    //         connection.release();
    //     } catch (error) {
    //         console.log('select card error: ',error);
    //     }
    //     return new Promise((resolve, reject) =>{
    //         resolve(result);
    //     });
    // }
}

export {Card};