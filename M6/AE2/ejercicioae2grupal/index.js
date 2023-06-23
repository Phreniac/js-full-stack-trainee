const http = require('http');
const fs = require('fs');
const url_ = require('url');


const server = http.createServer((req, res) => {
    //METODO GET
    //se usa el modulo url para parsear la url del request
    const parsed_url = url_.parse(req.url, true);
    // se extrae el atributo query de la url parseada que es el que tiene los parametros
    const { query } = parsed_url;
    // console.log('nombre', query.nombre);
    // console.log('contenido', query.contenido);
    const url = new URL(req.url, `http://${req.headers.host}`);
    const path = url.pathname;
    //codigo para generar las rutas del crud del archivo

    //METODO POST
    if(req.method === "POST"){
        const extension_archivo = '.txt';
        if (path.startsWith('/crear-archivo/')) {
            let body = '';
            req.on('data', data=>{
                body += data;
                //console.log(body);
                //se obtiene el body con los parametros
            });
            req.on('end', async ()=>{
                //se procesa el body para extraer los parametros y se definen en constantes
                const formData = new URLSearchParams(body);
                const nombre_archivo = `${formData.get('nombre')}${extension_archivo}`;
                const contenido_archivo = formData.get('contenido');
                console.log('nombre', nombre_archivo);
                console.log('contenido', contenido_archivo);
                try {
                    fs.writeFile(nombre_archivo, contenido_archivo, (error) => {
                        if (error) {
                            console.error(error);
                            return;
                        }
                        console.log('El archivo se ha escrito correctamente.');
                        res.write('Se creo el archivo correctamente'); 
                        
                    });
                } catch (error) {
                    console.log('error writefile:', error);
                    res.write('Ocurrio un error al crear el archivo'); 
                    res.end();
                }
                res.end();
            });
        }else{
            res.write('Pagina no encontrada');
            res.end();
        }
    }
    /*forma 1 de obtener parametros desde la url ej: /dominio/parametro1/parametro2
    const url = new URL(req.url, `http://${req.headers.host}`);
    const path = url.pathname;
    // Aquí es donde se manejarán las solicitudes y se enviarán las respuestas
    console.log('PATH: ', path);
    console.log('Start with:', path.startsWith('/crear-archivo/'));
    if (path.startsWith('/crear-archivo/')) {
        const nombre = path.slice(15);
        const params = nombre.split('/');
        console.log('parametros', params);
        res.write('crear archivo'); 
        res.end(); // Finaliza la respuesta
    }else{
        res.write('Pagina no encontrada');
        res.end();
    }

    // if (req.url === '/write-file') {
    //   fs.writeFile('archivo.txt', 'Hola mundo', (error) => {
    //       if (error) {
    //         console.error(error);
    //         return;
    //       }
    //       console.log('El archivo se ha escrito correctamente.');
    //       res.write('El archivo se ha escrito correctamente.'); // Envía una respuesta al cliente
    //       res.end(); // Finaliza la respuesta
    //   });
    

    // // }else {
    // //   res.write('Pagina no encontrada'); // Envía una respuesta al cliente
    // //   res.end(); // Finaliza la respuesta
    // // }
    // }*/
});

const port = 3200; // Puerto en el que el servidor escuchará las solicitudes
server.listen(port, () => {
  console.log(`Servidor en funcionamiento en el puerto ${port}`);
});