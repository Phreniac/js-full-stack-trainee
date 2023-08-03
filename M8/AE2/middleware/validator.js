export const stringValidation = (req,res, next) => {
    if(typeof req.body.nombre === 'string'){
        req.body.nombrecompleto = req.body.nombre+' '+req.body.apellido;
        next();
    }else{
        res.status(500).send('Error tipo de dato');
    }
};

export const hello = (nombre) => {
    console.log(`hello ${nombre}!!`);
    return function(req, res, next){
        next();
    }
};