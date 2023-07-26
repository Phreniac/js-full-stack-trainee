import {UsersMovies} from '../model/usersMoviesModel.js';
//funcion controlador para crear un usuario
export const createUsersMovies = async (req, res) =>{
    let response = {
        msg:'Users Movies creation',
        error: null,
        data: null
    };
    const id_user = req.body.id_user;
    const id_movie = req.body.id_movie;

    if(id_user && id_movie){
        const usersmovies = new UsersMovies(id_user,id_movie);
        const model_result = await usersmovies.createUsersMovies();
        if(model_result != null) response.data = model_result;
        else response.error = 'Error trying to create the user'
    }else{
        response.error = "Missing required parameters";
    }
    res.send(response);
};