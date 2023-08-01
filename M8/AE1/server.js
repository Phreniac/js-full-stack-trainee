const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

const pokemones = [];

app.get('/pokemon/todos', (req, res) => {
  res.send(pokemones);
});

app.post('/pokemon/crear', (req, res) => {
    const nombre = req.body.nombre;
    const tipo = req.body.tipo;
    let pokemon = null;
    if(nombre && tipo){
        pokemon = {
            id: pokemones.length + 1,
            nombre: nombre,
            tipo: tipo,
            links:{
                todos: 'http://localhost:3000/pokemon/todos',
                eliminar: 'http://localhost:3000/pokemon/delete/' + pokemones.length + 1,
                modificar: 'http://localhost:3000/pokemon/update/' + pokemones.length + 1
            }
        }
        pokemones.push(pokemon);
    }
    res.send(pokemon);
  });

app.listen(port, () => {
  console.log(`Servidor ejecutándose en http://localhost:${port}`);
});
