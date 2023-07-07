## NodeJs
Node.js es un entorno de tiempo de ejecución de JavaScript del lado del servidor que permite a los desarrolladores construir aplicaciones web y servicios altamente escalables. A diferencia de otros entornos de servidor tradicionales, Node.js se basa en un enfoque sin bloqueo y basado en eventos, lo que le confiere una serie de características únicas y ventajas significativas.

## Origen y Arquitectura:

Node.js fue creado por Ryan Dahl y se lanzó por primera vez en 2009. Está construido sobre el motor JavaScript V8 de Chrome, desarrollado por Google. La elección de V8 permite que Node.js ejecute código JavaScript de manera eficiente y rápida.

Node.js utiliza un modelo de arquitectura sin bloqueo y basado en eventos. Esto significa que puede manejar múltiples solicitudes y operaciones de manera concurrente sin bloquear el hilo de ejecución principal. En lugar de esperar a que una operación de entrada/salida (E/S) se complete antes de pasar a la siguiente, Node.js delega la tarea a un proceso de fondo y continúa con otras tareas. Una vez que la operación de E/S se completa, se invoca un callback para manejar los resultados.

## Beneficios y ventajas

- Rendimiento y escalabilidad: Node.js es altamente eficiente en términos de uso de recursos y puede manejar grandes cantidades de solicitudes concurrentes sin problemas. Esto se debe a su enfoque sin bloqueo y basado en eventos, que minimiza la sobrecarga del sistema y maximiza el rendimiento.

- Desarrollo rápido: Node.js utiliza JavaScript tanto en el lado del cliente como en el servidor, lo que permite a los desarrolladores utilizar el mismo lenguaje de programación en ambos entornos. Esto simplifica el proceso de desarrollo y facilita la transferencia de conocimientos y código entre el front-end y el back-end.

- Amplio ecosistema y comunidad activa: Node.js cuenta con una gran cantidad de paquetes y módulos disponibles a través del administrador de paquetes npm. Esto proporciona a los desarrolladores acceso a una amplia gama de herramientas, bibliotecas y frameworks que pueden acelerar el desarrollo de aplicaciones.

- Soporte para aplicaciones en tiempo real: Node.js es ideal para aplicaciones que requieren actualizaciones en tiempo real y comunicación bidireccional, como aplicaciones de chat, juegos en línea y colaboración en tiempo real. Su capacidad para manejar una gran cantidad de conexiones simultáneas y eventos lo convierte en una opción popular para este tipo de aplicaciones.

- Comunidad y documentación: Node.js cuenta con una comunidad activa de desarrolladores y una amplia documentación en línea. Esto facilita la resolución de problemas, el aprendizaje y el intercambio de conocimientos con otros desarrolladores.

## Uso

Node.js es ampliamente utilizado en diversas áreas, incluyendo:

1. Desarrollo de aplicaciones web del lado del servidor.
2. Construcción de APIs y servicios web.
3. Aplicaciones en tiempo real, como chat en tiempo real y sistemas de notificación.
4. Herramientas de línea de comandos y automatización de tareas.
5. Microservicios y arquitecturas basadas en servicios.
6. Streaming de datos y manipulación de archivos.
7. Internet de las cosas (IoT) y aplicaciones embebidas.

## Módulos y paquetes en NodeJS

En Nodejs Los módulos son unidades de código encapsuladas que contienen funciones, variables y objetos que se pueden reutilizar en una aplicación. Los módulos ayudan a organizar y modularizar el código, lo que facilita su mantenimiento y reutilización.

Cada archivo JavaScript se considera un módulo por defecto. Esto significa que el código escrito en un archivo está aislado y no es accesible directamente desde otros archivos a menos que se exporten explícitamente.

Para utilizar un módulo en otro archivo, se utiliza el sistema de exportación e importación de Node.js. Hay diferentes formas de exportar e importar módulos en Node.js:

Exportar módulos:

Utilizando module.exports: Se puede asignar un objeto, una función o cualquier valor al module.exports para que sea accesible desde otros archivos.
Utilizando exports: Es una referencia a module.exports, y se puede utilizar para agregar propiedades o métodos al objeto exportado.
Importar módulos:

Utilizando require(): Se utiliza la función require() para importar módulos en otros archivos. Se proporciona la ruta relativa o el nombre del módulo instalado y devuelve el objeto exportado por ese módulo.

### NPM

El sistema de gestión de paquetes npm (Node Package Manager) es una herramienta esencial en el ecosistema de Node.js. Permite instalar, administrar y compartir paquetes de código reutilizable.

Algunos comandos básicos de npm son:

npm init: Crea un archivo package.json en el directorio actual que contiene información sobre el proyecto y sus dependencias.
npm install [nombre paquete]: Instala un paquete y guarda su referencia en el archivo package.json.
npm install: Instala todas las dependencias listadas en el archivo package.json en el directorio actual.
npm uninstall [nombre paquete]: Desinstala un paquete y lo elimina de la lista de dependencias en package.json.
npm update: Actualiza las dependencias a las versiones más recientes, según las restricciones definidas en package.json.

El ecosistema de Node.js cuenta con una amplia gama de paquetes y módulos disponibles a través de npm. Algunos paquetes populares y su importancia en el ecosistema de Node.js incluyen:

Express: Un framework web rápido y minimalista que simplifica la creación de aplicaciones web y APIs.
Socket.IO: Permite la comunicación en tiempo real bidireccional entre el servidor y el cliente, lo que es fundamental para aplicaciones de chat y juegos en tiempo real.
Mongoose: Proporciona una interfaz sencilla para interactuar con bases de datos MongoDB, facilitando la creación de aplicaciones basadas en esta base de datos NoSQL.
Lodash: Una biblioteca de utilidades que proporciona funciones útiles para manipulación y transformación de datos.
Axios: Un cliente HTTP basado en promesas que facilita el envío de solicitudes HTTP desde Node.js.

## Creación de un servidor web basico con NodeJS

Para crear un servidor web básico utilizando el módulo http incorporado de Node.js, puedes seguir estos pasos:

Importar el módulo http:

```js
const http = require('http');
```
Crear el servidor:

```javascript
const server = http.createServer((req, res) => {
  // Aquí es donde se manejarán las solicitudes y se enviarán las respuestas
});
```
Configurar las rutas y manejar las solicitudes:

Dentro del servidor, puedes definir diferentes rutas y manejar las solicitudes correspondientes. Puedes hacer esto utilizando el método req.url para obtener la URL solicitada y el método res.write() para enviar una respuesta al cliente. Finalmente, utiliza res.end() para finalizar la respuesta.

```javascript
const server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.write('¡Hola, mundo!'); // Envía una respuesta al cliente
    res.end(); // Finaliza la respuesta
  } else if (req.url === '/about') {
    res.write('Acerca de nosotros'); // Envía una respuesta al cliente
    res.end(); // Finaliza la respuesta
  } else {
    res.write('Página no encontrada'); // Envía una respuesta al cliente
    res.end(); // Finaliza la respuesta
  }
});
```

Iniciar el servidor:

Después de configurar el servidor, puedes especificar el puerto en el que deseas que el servidor escuche las solicitudes. Puedes utilizar el método server.listen() para iniciar el servidor y pasar el número de puerto deseado.

```javascript
const port = 3000; // Puerto en el que el servidor escuchará las solicitudes
server.listen(port, () => {
  console.log(`Servidor en funcionamiento en el puerto ${port}`);
});
```

---
## API RESTful

Una API RESTful (Representational State Transfer) es un estilo de arquitectura de diseño de servicios web que se basa en los principios del protocolo HTTP (Hypertext Transfer Protocol) para permitir la comunicación entre sistemas distribuidos.

Conceptos clave relacionados con una API RESTful:

- Recursos: En una API RESTful, los datos se modelan como recursos, que pueden ser objetos, colecciones de objetos o cualquier otra entidad identificable. Cada recurso tiene una URL única, conocida como el punto final (endpoint).

- Métodos HTTP: Los métodos HTTP, como GET, POST, PUT y DELETE, se utilizan para realizar operaciones en los recursos de una API RESTful. Cada método representa una acción específica:

- GET: Se utiliza para recuperar información o recursos del servidor. Por ejemplo, obtener los detalles de un usuario.

- POST: Se utiliza para crear nuevos recursos en el servidor. Por ejemplo, agregar un nuevo usuario.

- PUT: Se utiliza para actualizar un recurso existente en el servidor. Por ejemplo, modificar los detalles de un usuario.

- DELETE: Se utiliza para eliminar un recurso existente en el servidor. Por ejemplo, eliminar un usuario.

Estado de la representación (Representation State): La representación de un recurso en un momento dado se conoce como su estado de representación. Los servidores RESTful deben ser stateless (sin estado), lo que significa que no deben almacenar información sobre el estado de los clientes entre solicitudes. En cambio, el estado se gestiona mediante la transferencia de datos entre el cliente y el servidor.

Formato de datos: Los datos transmitidos a través de una API RESTful suelen estar en formatos como JSON (JavaScript Object Notation) o XML (eXtensible Markup Language). JSON es el formato más comúnmente utilizado debido a su simplicidad y facilidad de uso.

Códigos de estado HTTP: Los códigos de estado HTTP se utilizan para indicar el resultado de una solicitud realizada a una API RESTful. Algunos códigos de estado comunes incluyen:

- 200 OK: La solicitud fue exitosa y se devolvió el resultado esperado.
- 201 Created: Se ha creado un nuevo recurso como resultado de la solicitud.
- 400 Bad Request: La solicitud no se pudo comprender o contiene parámetros inválidos.
- 404 Not Found: El recurso solicitado no se encontró en el servidor.
- 500 Internal Server Error: Se produjo un error en el servidor mientras intentaba procesar la solicitud del cliente.

## Modulo FS

El módulo fs en Node.js proporciona una API para interactuar con el sistema de archivos del sistema operativo. Con este módulo, puedes realizar una variedad de operaciones, como leer y escribir archivos, crear y eliminar directorios, obtener información sobre archivos y directorios, y mucho más.

Para utilizar el módulo fs, debes importarlo en tu archivo JavaScript de la siguiente manera:

```js
const fs = require('fs');
```

#### Funciones y metodos comunes

1. Leer un archivo:

```js
fs.readFile('archivo.txt', 'utf8', (error, data) => {
  if (error) {
    console.error(error);
    return;
  }
  console.log(data);
});
```

Este código lee el contenido de un archivo llamado "archivo.txt" y lo muestra en la consola. El segundo argumento es opcional y especifica la codificación del archivo.

2. Escribir en un archivo:

```js
fs.writeFile('archivo.txt', 'Contenido del archivo', (error) => {
  if (error) {
    console.error(error);
    return;
  }
  console.log('El archivo se ha escrito correctamente.');
});
```

>Este código crea o sobrescribe un archivo llamado "archivo.txt" con el contenido especificado.

3. Crear un directorio:

```js
fs.mkdir('directorio', (error) => {
  if (error) {
    console.error(error);
    return;
  }
  console.log('El directorio se ha creado correctamente.');
});
```

>Este código crea un nuevo directorio llamado "directorio".

4. Eliminar un archivo:

```js
fs.unlink('archivo.txt', (error) => {
  if (error) {
    console.error(error);
    return;
  }
  console.log('El archivo se ha eliminado correctamente.');
});
```
5. Renombrar un archivo

```js
fs.rename('nombre_antiguo', 'nombrenuevo', (err)=>{
  if(err){
    console.log('ocurrio un error al renombrar');
  }else{
     console.log('Archivo renombrado correctamente');
  }
})
```
>Este código elimina un archivo llamado "archivo.txt".