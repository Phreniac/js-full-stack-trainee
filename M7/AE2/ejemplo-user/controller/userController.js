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
