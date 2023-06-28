const express = require('express');
const router = express.Router();
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const moment = require('moment');
let _ = require('lodash');
const url_user_generator = 'https://api.generadordni.es/v2/profiles/person?results=1';
let userList = [];

router.get('/get-user/:user_uuid', (req, res)=>{
    const user_uuid_ = req.params.user_uuid;
    let user = {};
    if(user_uuid_){
        console.log('uuid',user_uuid_);
        console.log('user list',userList);
       const user_index = _.findIndex(userList, function(o) { return o.uuid == user_uuid_; });
       console.log('user index', user_index);
       if(user_index >= 0){
         user = userList[user_index];
       }
    }
    res.send(user);
});

//ruta para registrar un usuario
/*
-Genera un array con la cantidad de usuario que se requiere generar
-Se itera el array generado y se utiliza axios para la generación de un usuario random
-Se le agrega al usuario generado un uuid y un timestamp
-Se añade el usuario a una lista y se envia al cliente
*/
router.post('/register-user', async (req, res)=>{
    const qntity = req.body.qntity;
    let user_list = [];
    console.log('qntity', qntity);
    if(qntity){
        //se genera array vacio
        const qntity_arr = Array(qntity).fill(null);
        //se itera el array
        for (const i of qntity_arr) {
            let generated_user = null;
            //se obtiene el usuario generado
            await axios.get(url_user_generator).then(res_=>{
                const data = res_.data;
                if(data.length > 0){
                    generated_user = data[0];
                    //se agrega la info extra
                    generated_user.uuid = uuidv4();
                    generated_user.creation_date = moment().format('MMMM Do YYYY, h:mm:ss a');
                    user_list.push(generated_user);
                    userList.push(generated_user);

                }
            }).catch(error=>{
                console.log('Error register-user: ', error);
            })
        }
    }
    //se envia la lista de usuario a cliente
    res.send(user_list);
});

router.get('/get-all-user', (req, res)=>{
    res.send(userList);
});

module.exports = router;