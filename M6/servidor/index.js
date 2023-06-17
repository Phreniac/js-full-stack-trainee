const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
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