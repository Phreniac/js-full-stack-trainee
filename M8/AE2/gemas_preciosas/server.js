import express from 'express';
const app = express();

app.use(express.json());

const _routes = {
    self:'/jewell/:id_jewell',
    create:'/jewell/create',
    getall:'/jewell-getall/',
    delete:'/jewell/delete',
    update:'/jewell/update'
}

const jewell_list = [];
//ruta para crear
app.post(_routes.create, async (req, res, next) => {
    const _host = 'http://'+req.headers.host;
    try {
        const {name, weight, price, material} = req.body;
        if(name && weight && price && material){
            const id_jewell = jewell_list.length + 1;
            const jewell = {
                id: id_jewell,
                name: name,
                weight:weight,
                price:price,
                material:material,
                links:{
                    self: _host + _routes.self.replace(':id_jewell', id_jewell),
                    getall: _host + _routes.getall,
                    update: _host + _routes.update +'/'+ id_jewell,
                    delete: _host +_routes.delete +'/'+ id_jewell,
                }
            }
        jewell_list.push(jewell);
        res.status(200).send(jewell);
    }else{
        next(new Error('Missing required parameters.'));
    }
    } catch (error) {
        next(new Error('Internal server error.')); 
    }
    
});
// ruta para busqueda por id
app.get(_routes.self, async (req, res, next) => {
    try {
        const {id_jewell} = req.params;
        let finded_jewell = jewell_list.find(jewell => jewell.id == id_jewell);
        if(finded_jewell){
            res.status(200).send(finded_jewell);
        }else{
            res.status(404).send('La joya no se encontró.');
        }
    } catch (error) {
        next(new Error('Internal server error.')); 
    }
});

//filtros para busqueda
app.get(_routes.getall, async (req, res, next) => {
    try {
        const {name, material} = req.query;
        let filtered_jewell_list = jewell_list;
        if(name){
            filtered_jewell_list = filtered_jewell_list.filter(jewell => jewell.name.includes(name));
        }
        if(material){
            filtered_jewell_list = filtered_jewell_list.filter(jewell => jewell.material.includes(material));
        }
        res.status(200).send(filtered_jewell_list);
    } catch (error) {
        next(new Error('Internal server error.')); 
    }
});

//rutas por hacer

app.put(_routes.update + '/:id_jewell', async (req, res, next) => {
    
});

app.delete(_routes.delete + '/:id_jewell', async (req, res, next) => {
    
});

//middleware control de error generico
app.use((err, req, res, next) => {
    console.log(err);
    if(err){
        res.status(500).send('Ocurrio un error!');
    } 
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});