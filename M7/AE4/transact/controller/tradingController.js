import {Trading} from '../model/tradingModel.js';
//funcion controlador para crear un intercambio
export const createTrade = async (req, res) =>{
    let response = {
        msg:'Trading card',
        error: null,
        data: null
    };
    const id_card_giver = req.body.id_card_giver;
    const id_card_receiver = req.body.id_card_receiver;
    const id_user_giver = req.body.id_user_giver;
    const id_user_receiver = req.body.id_user_receiver;


    if(id_card_giver && id_card_receiver && id_user_giver && id_user_receiver){
        const trading = new Trading();
        trading.id_card_giver = id_card_giver;
        trading.id_card_receiver = id_card_receiver;
        trading.id_user_giver = id_user_giver;
        trading.id_user_receiver = id_user_receiver;

        const model_result = await trading.tradeCard(trading);
        console.log('trading card model response: ', model_result);
        if(model_result != null) response.data = model_result;
        else response.error = 'Error trying to create the user'
    }else{
        response.error = "Missing required parameters";
    }
    res.send(response);
};
