import {User} from '../model/userModel.js';
export const createUser = async (req, res) =>{
    let response = {
        msg:'User creation',
        error: null,
        data: null
    };
    const name = req.body.name;
    const lastname = req.body.lastname;
    const idnumber = req.body.idnumber;
    const email = req.body.email;

    if(name && idnumber && lastname && email){
        const user = new User();
        user.name = name;
        user.lastname = lastname;
        user.email = email;
        user.idnumber =idnumber;
        const model_result = await user.createUser(user);
        if(model_result != null) response.data = model_result;
        else response.error = 'Error trying to create the user'
    }else{
        response.error = "Missing required parameters";
    }
    res.send(response);
};
export const getAllUsers = async (req, res) =>{
    let response = {
        msg:'Get all Users',
        error: null,
        data: null
    };
    try {
        const user = new User();
        const model_result = await user.getAllUsers();
        if(model_result != null){
            if(model_result.length == 0){
                response.error = 'There is no users in the data base'; 
            }
            response.data = model_result;
        }
        else{
            response.error = 'Error trying to get all the users';
        } 
        res.status(200).send(response);
    } catch (error) {
        response.error = 'Server internal error';
        res.status(500).send(response);
    }
    
};
export const updateUser = async (req, res) =>{
    let response = {
        msg:'User update',
        error: null,
        data: null
    };
    const id_user = req.params.id_user;
    const name = req.body.name;
    const lastname = req.body.lastname;
    const idnumber = req.body.idnumber;
    const email = req.body.email;

    if(id_user && name && idnumber && lastname && email){
        const user = new User();
        user.name = name;
        user.lastname = lastname;
        user.email = email;
        user.idnumber =idnumber;
        user.id = id_user;
        const model_result = await user.updateUser(user);
        if(model_result != null) response.data = model_result;
        else response.error = 'Error trying to update the user'
    }else{
        response.error = "Missing required parameters";
    }
    res.send(response);
};
export const deleteUser = async (req, res) =>{
    let response = {
        msg:'User delete',
        error: null,
        data: null
    };
    const id_user = req.params.id_user;

    if(id_user){
        const user = new User();
        user.id = id_user;
        const model_result = await user.deleteUser(user);
        if(model_result != null) response.data = model_result;
        else response.error = 'Error trying to delete the user'
    }else{
        response.error = "Missing required parameters";
    }
    res.send(response);
};