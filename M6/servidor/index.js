const http = require('http');
const https = require('https');
const fs = require('fs');

//llamado a una api externa con el modulo https
const pokeDex = async (nombre)=>{
  //usando .get
  const url = `https://pokeapi.co/api/v2/stat/${nombre}`;
  console.log(url);
  await https.get(url, res =>{
    let data = '';
    //se obtiene la data desde la api y se asigna
    res.on("data",(chunk) =>{
      data += chunk;
    });
    res.on("end", ()=>{
     // console.log('Data:', JSON.parse(data));
    })
  }).on("error", (err)=>{
    console.log('error api:', err)
  });
}

const pokeDexRequest = async (nombre)=>{
  //usando https.request
  const options = {
    hostname:'pokeapi.co',
    path:`/api/v2/stat/${nombre}`,
    method: 'GET'
  }
  const request =  https.request(options, res =>{
    let data = '';
    //se obtiene la data desde la api y se asigna
    res.on("data",(chunk) =>{
      data += chunk;
    });
    res.on("end", ()=>{
      console.log('Data:', JSON.parse(data));
    })
  });
  request.end();
}

const server = http.createServer((req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const path = url.pathname;
    // Aquí es donde se manejarán las solicitudes y se enviarán las respuestas
    if (req.url === '/') {
      res.write('¡Hola, mundo!'); // Envía una respuesta al cliente
      res.end(); // Finaliza la respuesta
    } else if (req.url === '/about') {
      res.write('Acerca de nosotros'); // Envía una respuesta al cliente
      res.end(); // Finaliza la respuesta
    } else if (req.url === '/write-file') {
      fs.writeFile('archivo.txt', 'Hola mundo', (error) => {
          if (error) {
            console.error(error);
            return;
          }
          console.log('El archivo se ha escrito correctamente.');
          res.write('El archivo se ha escrito correctamente.'); // Envía una respuesta al cliente
          res.end(); // Finaliza la respuesta
      });
    }else if (path.startsWith('/pokemon/')) {
      console.log('llego a pokemon con parametro', path.slice(9));
      const id_pokemon = path.slice(9);
      res.write('consulta pokemon'); 
      res.end(); // Finaliza la respuesta
      pokeDex(id_pokemon);
      pokeDexRequest(id_pokemon);
    }
    else {
      res.write('Pagina no encontrada'); // Envía una respuesta al cliente
      res.end(); // Finaliza la respuesta
    }
});

const port = 3120; // Puerto en el que el servidor escuchará las solicitudes
server.listen(port, () => {
  console.log(`Servidor en funcionamiento en el puerto ${port}`);
});