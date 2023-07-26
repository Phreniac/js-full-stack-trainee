import {Movie} from '../model/movieModel.js';
//funcion controlador para crear un usuario
export const createMovie = async (req, res) =>{
    let response = {
        msg:'Movies creation',
        error: null,
        data: null
    };
    const title = req.body.title;
    const duration = req.body.duration;
    const year = req.body.year;

    if(title && duration && year){
        const movie = new Movie(title,duration,year);
        const model_result = await movie.createMovie();
        if(model_result != null) response.data = model_result;
        else response.error = 'Error trying to create the user'
    }else{
        response.error = "Missing required parameters";
    }
    res.send(response);
};