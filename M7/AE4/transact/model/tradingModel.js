import {createPool} from '../utils/db.js';
class Trading {

    constructor(){
    }
    
    get id_user_giver(){
        return this._id_user_giver;
    }
    set id_user_giver(id_user_giver){
        this._id_user_giver = id_user_giver;
    }
    get id_card_giver(){
        return this._id_card_giver;
    }
    set id_card_giver(id_card_giver){
        this._id_card_giver = id_card_giver;
    }
    get id_user_receiver(){
        return this._id_user_receiver;
    }
    set id_user_receiver(id_user_receiver){
        this._id_user_receiver = id_user_receiver;
    }
    get id_card_receiver(){
        return this._id_card_receiver;
    }
    set id_card_receiver(id_card_receiver){
        this._id_card_receiver = id_card_receiver;
    }

    tradeCard = async (trading) =>{ 
        let result = null;
        const pool = await createPool();
        const connection = await pool.getConnection();
        try {
            await connection.beginTransaction();
            console.log('trading', trading);
            // quitar la carta al primer usuario
            let [rows1] = await connection.execute('DELETE FROM user_card WHERE id_user = ? AND id_card = ?', [trading._id_user_giver, trading._id_card_giver]);
            console.log('delete user/card giver: ', rows1);
             // quitar la carta al segundo usuario
             let [rows3] = await connection.execute('DELETE FROM user_card WHERE id_user = ? AND id_card = ?', [trading._id_user_receiver,trading._id_card_receiver]);
             console.log('delete user/card receiver: ', rows3);
            // darle la carta quitada al segundo usuario
            let [rows2] = await connection.execute('INSERT INTO user_card (id_user, id_card, quantity) VALUES (?,?,?)', [trading._id_user_giver,trading._id_card_receiver, 1]);
            console.log('insert user/card giver: ', rows2);
            // darle la carta quitada al primer usuario
            let [rows4] = await connection.execute('INSERT INTO user_card (id_user, id_card, quantity) VALUES (?,?,?)', [trading._id_user_receiver, trading._id_card_giver, 1]);
            console.log('insert user/card receiver: ', rows4);
            await connection.commit();
            result = true;
            connection.release();
        } catch (error) {
            await connection.rollback();
            console.log('insert card error: ',error);
        }
        return result;
    }

}

export {Trading};